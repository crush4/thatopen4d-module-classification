/**
 * @module packages/module-classification/src/panel
 *
 * Klassifikations-Verwaltung: projektinterne Hierarchie von Klassen
 * (z. B. IfcWall → Wand-Typ → Spezial-Wand), optional mit bSDD-/Uniclass-
 * Referenzen für die Kopplung an externe Klassifikationssysteme.
 *
 * **Status.** Phase-2-Fachmodul. Server-Persistenz ist fertig
 * (`/api/projects/:id/twin/classes`); dieser Panel-PR macht sie für den
 * Nutzer bedienbar. Die Rolle der Klassen ist heute primär dokumentativ
 * — spätere Phasen binden sie an SearchGroups, Rule-Engine und Ditto-
 * Projektion (`TwinClass`-Features).
 *
 * **UI-Scope V1.**
 *   - Sortierte, hierarchisch eingerückte Liste (parentId-Chain-Resolver).
 *   - Textsuche über Code + Label + bSDD.
 *   - CRUD-Dialog (Code, Label, Parent, bSDD-Ref, Uniclass).
 *   - „Aus geladenen Modellen übernehmen" — scannt EntityRegistry,
 *     deduplicated `TwinEntity.class.ifcEntity`, bulk-importiert alle
 *     noch nicht als Code vorhandenen Einträge.
 *
 * **Zielgruppe.** Alle Projektmitglieder sehen das Panel. Schreibende
 * Aktionen prüft der Server über `requireProjectOwner|Admin`.
 */

import "./panel.css";

import * as OBC from "@thatopen/components";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactPanelProps } from "@thatopen4d/plugin-sdk/registry";
import {
  ModulePanel,
  ModulePanelHeader,
  ModulePanelToolbar,
  ModulePanelBody,
  ModulePanelButton,
  EmptyState,
  toast,
  confirmDialog,
} from "@thatopen4d/plugin-sdk/ui";
import {
  projectContext,
  onProjectLoaded,
  onProjectUnloaded,
  getAuthState,
} from "@thatopen4d/plugin-sdk/host";
import {
  EntityRegistry,
  ClassRegistry,
  SchemaRegistry,
  formatIfcEntityName,
} from "@thatopen4d/plugin-sdk/twin";
import type {
  CreateTwinClassBody,
  TwinClassRow,
} from "@thatopen4d/plugin-sdk/shared";
import {
  list,
  create,
  update,
  remove,
  importBulk,
  buildHierarchy,
  ApiError,
} from "./service";
import { ClassRow, TableHeader } from "./views/table";
import { ClassEditorDialog } from "./views/class-editor-dialog";
import { ImportDialog } from "./views/import-dialog";

// ═══════════════════════════════════════════════════════════════
// View-State (Discriminated Union)
// ═══════════════════════════════════════════════════════════════

/**
 * Modale Alternativen — immer genau eine aktiv oder `list` (Default-Zustand).
 * Ersetzt zwei einzelne `useState<boolean>` + `useState<TwinClassRow | null>`
 * und macht unmögliche Kombinationen (Editor + Import gleichzeitig offen)
 * unrepräsentierbar.
 */
type ClassificationView =
  | { kind: "list" }
  | { kind: "editor"; target: TwinClassRow | null }
  | { kind: "import" };

const LIST_VIEW: ClassificationView = { kind: "list" };

// ═══════════════════════════════════════════════════════════════
// Haupt-Komponente
// ═══════════════════════════════════════════════════════════════

export function ClassificationPanel({ components }: ReactPanelProps) {
  const [projectId, setProjectId] = useState<string | null>(
    projectContext.activeProjectId,
  );

  useEffect(() => {
    const onLoaded = ({ projectId: pid }: { projectId: string }) =>
      setProjectId(pid);
    const onUnloaded = () => setProjectId(null);
    onProjectLoaded.add(onLoaded);
    onProjectUnloaded.add(onUnloaded);
    return () => {
      onProjectLoaded.remove(onLoaded);
      onProjectUnloaded.remove(onUnloaded);
    };
  }, []);

  // Schreibender Zugriff: Admins + Projekt-Owner. Der AuthState zeigt heute
  // nur die Systemrolle; die Projektrolle wird vom Server bei jedem Write
  // zusätzlich geprüft. Für die UI reicht dieser Flag als Vor-Filter.
  const authState = getAuthState();
  const canWrite = authState.user?.role === "admin";

  const [rows, setRows] = useState<TwinClassRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ClassificationView>(LIST_VIEW);

  const refresh = useCallback(async () => {
    if (!projectId) {
      setRows([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const classes = await list(projectId);
      setRows(classes);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Fehler beim Laden der Klassen",
      );
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const hierarchical = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return buildHierarchy(rows);
    // Bei aktiver Suche: flach, gefiltert — Hierarchie ist bei Suche nicht
    // sinnvoll, weil Parents des Matches sonst mitgezogen werden müssten.
    return rows
      .filter(
        (c) =>
          c.code.toLowerCase().includes(q) ||
          c.label.toLowerCase().includes(q) ||
          (c.bsddRef ?? "").toLowerCase().includes(q) ||
          (c.uniclass ?? "").toLowerCase().includes(q),
      )
      .sort((a, b) => a.code.localeCompare(b.code))
      .map((c) => ({ ...c, depth: 0 }));
  }, [rows, search]);

  /**
   * Nach jedem Write: ClassRegistry-Cache + PropertyRegistry-Schema-Cache
   * invalidieren und neu laden. Damit sehen Evaluation + SearchGroups den
   * neuen Klassen-Stand sofort beim nächsten `recalculate`-/Column-Refresh,
   * ohne dass die Module von Classification abhängig sein müssen.
   */
  const invalidateClassCaches = useCallback(async () => {
    if (!components || !projectId) return;
    try {
      components.get(SchemaRegistry).invalidate();
      await components.get(ClassRegistry).loadForProject(projectId);
    } catch (e) {
      console.debug("[classification] invalidateClassCaches failed:", e);
    }
  }, [components, projectId]);

  const handleSave = useCallback(
    async (body: CreateTwinClassBody, targetId: string | null) => {
      if (!projectId) return;
      try {
        if (targetId) {
          await update(projectId, targetId, body);
        } else {
          await create(projectId, body);
        }
        setView(LIST_VIEW);
        await refresh();
        await invalidateClassCaches();
      } catch (e) {
        if (e instanceof ApiError && e.status === 409) {
          toast.error(
            `Der Code „${body.code}" ist bereits vergeben. Wähle einen anderen Code.`,
          );
        } else {
          toast.error(
            e instanceof Error
              ? e.message
              : "Speichern fehlgeschlagen (unbekannter Fehler).",
          );
        }
      }
    },
    [projectId, refresh, invalidateClassCaches],
  );

  const handleDelete = useCallback(
    async (row: TwinClassRow) => {
      if (!projectId) return;
      const hasChildren = rows.some((r) => r.parentId === row.id);
      const ok = await confirmDialog({
        title: "Klasse löschen",
        message: `Klasse „${row.label}" (${row.code}) wirklich löschen?${
          hasChildren
            ? "\n\nHinweis: Kinder werden zur Wurzelebene verschoben."
            : ""
        }`,
        confirmLabel: "Löschen",
        danger: true,
      });
      if (!ok) return;
      try {
        await remove(projectId, row.id);
        await refresh();
        await invalidateClassCaches();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Löschen fehlgeschlagen.");
      }
    },
    [projectId, rows, refresh, invalidateClassCaches],
  );

  // ── IFC-Import-Dialog ──────────────────────────────────────────

  const existingCodes = useMemo(() => new Set(rows.map((r) => r.code)), [rows]);
  const importOpen = view.kind === "import";

  const availableIfcEntities = useMemo<string[]>(() => {
    if (!components) return [];
    const registry = safeGetEntityRegistry(components);
    if (!registry) return [];
    const set = new Set<string>();
    for (const entity of registry.values()) {
      const ifc = entity.class?.ifcEntity;
      if (ifc && !existingCodes.has(ifc)) set.add(ifc);
    }
    return Array.from(set).sort();
    // `importOpen` als Abhängigkeit erzwingt ein Re-Run beim Öffnen des
    // Dialogs — damit werden Entities gesehen, die nach dem ersten Render
    // geladen wurden.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [components, existingCodes, importOpen]);

  const handleImport = useCallback(
    async (ifcEntities: string[]) => {
      if (!projectId || ifcEntities.length === 0) return;
      const payload = {
        classes: ifcEntities.map((ifc) => ({
          code: ifc,
          label: formatIfcEntityName(ifc),
        })),
      };
      try {
        const result = await importBulk(projectId, payload);
        setView(LIST_VIEW);
        await refresh();
        await invalidateClassCaches();
        toast.success(
          `Import abgeschlossen — neu: ${result.imported}, übersprungen: ${result.skipped}`,
        );
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Import fehlgeschlagen.");
      }
    },
    [projectId, refresh, invalidateClassCaches],
  );

  // ══════════════════════════════════════════════════════════════════════
  // Render
  // ══════════════════════════════════════════════════════════════════════

  if (!projectId) {
    return (
      <ModulePanel>
        <ModulePanelHeader icon="solar:tag-bold" title="Klassifikation" />
        <EmptyState
          icon="solar:folder-open-bold"
          title="Kein Projekt geladen"
          message="Öffne ein Projekt über die Projekt-Pille, um Klassen zu verwalten."
        />
      </ModulePanel>
    );
  }

  return (
    <ModulePanel>
      <ModulePanelHeader
        icon="solar:tag-bold"
        title="Klassifikation"
        actions={
          canWrite ? (
            <>
              <ModulePanelButton
                icon="solar:import-bold"
                title="Klassen aus geladenen Modellen übernehmen"
                onClick={() => setView({ kind: "import" })}
              />
              <ModulePanelButton
                icon="solar:add-circle-bold"
                title="Neue Klasse anlegen"
                onClick={() => setView({ kind: "editor", target: null })}
                variant="primary"
              />
            </>
          ) : undefined
        }
      />

      <ModulePanelToolbar>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Code, Label, bSDD oder Uniclass suchen…"
          className="mod-cls-input"
          style={{ flex: 1 }}
        />
        <span className="mod-cls-toolbar-counter">
          {hierarchical.length} von {rows.length}
        </span>
      </ModulePanelToolbar>

      <ModulePanelBody>
        {loading && rows.length === 0 ? (
          <div className="mod-cls-pad-info">Lade Klassen…</div>
        ) : error ? (
          <div className="mod-cls-pad-info mod-cls-pad-info--error">
            {error}
          </div>
        ) : rows.length === 0 ? (
          <EmptyState
            icon="solar:tag-bold"
            title="Noch keine Klassen"
            message={
              canWrite
                ? "Lege eine Klasse manuell an oder übernimm die IFC-Entities aus dem geladenen Modell."
                : "Sobald ein Admin oder Owner Klassen anlegt, erscheinen sie hier."
            }
          />
        ) : (
          <>
            <TableHeader />
            {hierarchical.map((row) => (
              <ClassRow
                key={row.id}
                row={row}
                canWrite={canWrite}
                onEdit={() => setView({ kind: "editor", target: row })}
                onDelete={() => void handleDelete(row)}
              />
            ))}
          </>
        )}
      </ModulePanelBody>

      {view.kind === "editor" && (
        <ClassEditorDialog
          target={view.target}
          allClasses={rows}
          onClose={() => setView(LIST_VIEW)}
          onSave={handleSave}
        />
      )}

      {view.kind === "import" && (
        <ImportDialog
          candidates={availableIfcEntities}
          onClose={() => setView(LIST_VIEW)}
          onSubmit={handleImport}
        />
      )}
    </ModulePanel>
  );
}

// ═══════════════════════════════════════════════════════════════
// Lokale Helfer
// ═══════════════════════════════════════════════════════════════

/**
 * Defensiver Zugriff auf den EntityRegistry: liefert die Registry-Instanz
 * oder `null`, wenn das `EntityRegistry`-Component (noch) nicht registriert
 * ist. `components.get()` wirft bei unbekannten Components — in seltenen
 * Bootstrap-Races kann das passieren, deshalb das try/catch.
 */
function safeGetEntityRegistry(
  components: OBC.Components,
): EntityRegistry | null {
  try {
    return components.get(EntityRegistry);
  } catch {
    return null;
  }
}

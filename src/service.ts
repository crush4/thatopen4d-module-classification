/**
 * @module src/modules/classification/service
 *
 * Application-Service-Layer für das Klassifikations-Modul.
 * Kapselt alle REST-Aufrufe gegen `/api/projects/:id/twin/classes`
 * und enthält die Aggregations-Helfer, die das Panel sonst inline
 * berechnen würde.
 *
 * **Grenzen.** Keine OBC.Component-Aufrufe hier — nur HTTP-Wrapper
 * und reine Datentransformationen.
 */

import {
  listTwinClasses,
  createTwinClass,
  updateTwinClass,
  deleteTwinClass,
  importTwinClasses,
} from "@thatopen4d/api-clients/twin-classes";
import {
  searchBsdd,
  type BsddSearchResult,
} from "@thatopen4d/api-clients/bsdd";
import { ApiError } from "@thatopen4d/api-clients/client";
import type { BsddClassRef } from "@thatopen4d/api-clients/bsdd";
import type {
  CreateTwinClassBody,
  ImportClassesBody,
  ImportResult,
  TwinClassRow,
  UpdateTwinClassBody,
} from "@thatopen4d/plugin-sdk/shared";

export type {
  TwinClassRow,
  CreateTwinClassBody,
  UpdateTwinClassBody,
  ImportResult,
  BsddClassRef,
  BsddSearchResult,
};
// ApiError als Klasse re-exportieren, damit das Panel ihn für instanceof-Checks nutzen kann.
export { ApiError };

// ─── bSDD-Suche ──────────────────────────────────────────────

/**
 * Sucht bSDD-Klassen via Backend-Proxy.
 * @param q     - Suchbegriff (z. B. IfcEntity-Name oder Freitext)
 * @param limit - Maximale Trefferzahl (1–50, default 20)
 */
export async function searchBsddClasses(
  q: string,
  limit = 20,
): Promise<BsddSearchResult> {
  return searchBsdd(q, limit);
}

// ─── CRUD-Operationen ────────────────────────────────────────────

/** Lädt alle Klassen des Projekts. Server liefert nach `code` sortiert. */
export async function list(projectId: string): Promise<TwinClassRow[]> {
  return listTwinClasses(projectId);
}

/**
 * Erstellt eine neue Klasse.
 * @throws `ApiError(409)` wenn der Code bereits vergeben ist.
 */
export async function create(
  projectId: string,
  body: CreateTwinClassBody,
): Promise<TwinClassRow> {
  return createTwinClass(projectId, body);
}

/**
 * Aktualisiert eine bestehende Klasse.
 * @throws `ApiError(400)` wenn der neue Parent einen Zyklus erzeugen würde.
 */
export async function update(
  projectId: string,
  classId: string,
  body: UpdateTwinClassBody,
): Promise<TwinClassRow> {
  return updateTwinClass(projectId, classId, body);
}

/**
 * Löscht eine Klasse. Kinder werden DB-seitig zur Wurzelebene promoted
 * (`ON DELETE SET NULL`) — kein Kaskaden-Löschen.
 */
export async function remove(
  projectId: string,
  classId: string,
): Promise<void> {
  return deleteTwinClass(projectId, classId);
}

/**
 * Massen-Import aus IFC-Entity-Liste oder externen Klassenlisten.
 * Bereits vorhandene Codes werden übersprungen (Dedup über `code`).
 */
export async function importBulk(
  projectId: string,
  body: ImportClassesBody,
): Promise<ImportResult> {
  return importTwinClasses(projectId, body);
}

// ─── Hierarchie-Aggregation ───────────────────────────────────────

/**
 * Baut aus der flachen Liste eine depth-annotierte Preorder-DFS-Reihenfolge,
 * sodass Kinder direkt unter ihrem Parent erscheinen. Wurzel-Elemente werden
 * alphabetisch nach Code sortiert.
 *
 * Orphan-Guard: Klassen, deren `parentId` nicht mehr in der Liste existiert,
 * werden flach auf Tiefe 0 angehängt.
 */
export function buildHierarchy(
  classes: TwinClassRow[],
): Array<TwinClassRow & { depth: number }> {
  const byParent = new Map<string | null, TwinClassRow[]>();
  for (const c of classes) {
    const key = c.parentId ?? null;
    const arr = byParent.get(key) ?? [];
    arr.push(c);
    byParent.set(key, arr);
  }
  // Alphabetisch nach Code innerhalb jeder Elterngruppe
  for (const arr of byParent.values())
    arr.sort((a, b) => a.code.localeCompare(b.code));

  const out: Array<TwinClassRow & { depth: number }> = [];
  const visit = (parentId: string | null, depth: number) => {
    const children = byParent.get(parentId) ?? [];
    for (const c of children) {
      out.push({ ...c, depth });
      visit(c.id, depth + 1);
    }
  };
  visit(null, 0);

  // Orphans flach anhängen (parentId zeigt auf nicht mehr vorhandene Klasse)
  const seen = new Set(out.map((c) => c.id));
  for (const c of classes) {
    if (!seen.has(c.id)) out.push({ ...c, depth: 0 });
  }
  return out;
}

/**
 * Berechnet die erlaubten Parent-Optionen beim Bearbeiten einer Klasse.
 * Schließt die Klasse selbst und alle transitiven Kinder aus, um Zyklen
 * zu verhindern. Der Server prüft ebenfalls — dieser Filter spart den Round-Trip.
 *
 * @param allClasses - Vollständige Klassenliste aus dem Server
 * @param excludeId  - ID der zu bearbeitenden Klasse (selbst ausschließen)
 * @returns Gefilterte Liste erlaubter Parent-Kandidaten
 */
export function buildCycleGuardedParents(
  allClasses: TwinClassRow[],
  excludeId: string,
): TwinClassRow[] {
  // Forbidden-Set: excludeId + alle transitiven Kinder (Fixpunkt-Iteration)
  const forbidden = new Set<string>([excludeId]);
  let added = true;
  while (added) {
    added = false;
    for (const c of allClasses) {
      if (c.parentId && forbidden.has(c.parentId) && !forbidden.has(c.id)) {
        forbidden.add(c.id);
        added = true;
      }
    }
  }
  return allClasses.filter((c) => !forbidden.has(c.id));
}

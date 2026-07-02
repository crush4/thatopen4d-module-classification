/**
 * @module packages/module-classification/src/views/class-editor-dialog
 *
 * CRUD-Dialog für TwinClass-Einträge.
 *
 * Öffnet sich zentriert, draggable via `.mod-cls-dialog-header`. Enthält
 * optional einen Sub-Dialog (BsddPickerModal) für die interaktive Auswahl
 * einer bSDD-URI.
 *
 * Parent-Dropdown filtert mit `buildCycleGuardedParents()` alle
 * transitiven Nachfahren der Ziel-Klasse aus — verhindert Zyklen schon
 * im Client (Server validiert nochmal).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Field, makeDraggable, openCentered } from "@thatopen4d/plugin-sdk/ui";
import type {
  CreateTwinClassBody,
  TwinClassRow,
} from "@thatopen4d/plugin-sdk/shared";
import { buildCycleGuardedParents } from "../service";
import { BsddPickerModal } from "./bsdd-picker-modal";

// ── ClassEditorDialog ──────────────────────────────────────────────────────

interface ClassEditorDialogProps {
  target: TwinClassRow | null;
  allClasses: TwinClassRow[];
  onClose: () => void;
  onSave: (body: CreateTwinClassBody, targetId: string | null) => Promise<void>;
}

export function ClassEditorDialog({
  target,
  allClasses,
  onClose,
  onSave,
}: ClassEditorDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [code, setCode] = useState(target?.code ?? "");
  const [label, setLabel] = useState(target?.label ?? "");
  const [parentId, setParentId] = useState<string>(target?.parentId ?? "");
  const [bsddRef, setBsddRef] = useState(target?.bsddRef ?? "");
  const [uniclass, setUniclass] = useState(target?.uniclass ?? "");
  const [saving, setSaving] = useState(false);
  /** Steuert, ob das bSDD-Picker-Sub-Modal geöffnet ist. */
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    openCentered(dlg);
    makeDraggable(dlg, ".mod-cls-dialog-header");
    const onBackdrop = (e: MouseEvent) => {
      if (e.target === dlg) onClose();
    };
    dlg.addEventListener("click", onBackdrop);
    return () => {
      dlg.removeEventListener("click", onBackdrop);
      try {
        dlg.close();
      } catch {
        /* ignore */
      }
    };
  }, [onClose]);

  // Potentielle Parents: alle außer der aktuellen Klasse und ihrer
  // transitiven Kinder (Zyklus-Guard via Service). Server validiert
  // ebenfalls — dieser Filter spart den Round-Trip.
  const parentOptions = useMemo(
    () =>
      target ? buildCycleGuardedParents(allClasses, target.id) : allClasses,
    [target, allClasses],
  );

  const handleSubmit = useCallback(async () => {
    const trimmedCode = code.trim();
    const trimmedLabel = label.trim();
    if (!trimmedCode || !trimmedLabel) return;
    setSaving(true);
    try {
      await onSave(
        {
          code: trimmedCode,
          label: trimmedLabel,
          parentId: parentId || undefined,
          bsddRef: bsddRef.trim() || undefined,
          uniclass: uniclass.trim() || undefined,
        },
        target?.id ?? null,
      );
    } finally {
      setSaving(false);
    }
  }, [code, label, parentId, bsddRef, uniclass, target, onSave]);

  const isSubmitDisabled = !code.trim() || !label.trim() || saving;

  return (
    <dialog ref={dialogRef} className="mod-cls-dialog">
      <div className="mod-cls-dialog-header">
        <bim-icon
          icon="solar:tag-bold"
          className="mod-cls-dialog-header-icon"
        />
        <span className="mod-cls-dialog-header-title">
          {target ? `Klasse bearbeiten: ${target.code}` : "Neue Klasse"}
        </span>
        <div className="mod-cls-dialog-header-spacer" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Dialog schließen"
          className="mod-cls-close-btn"
        >
          ×
        </button>
      </div>

      <div className="mod-cls-dialog-body">
        <Field label="Code (eindeutig)">
          <input
            type="text"
            autoFocus={!target}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="z.B. IfcWall, CLS-042, WND-S"
            className="mod-cls-input"
          />
        </Field>

        <Field label="Label">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="z.B. Wand, Fenster, Beton-Schalung"
            className="mod-cls-input"
          />
        </Field>

        <Field label="Parent-Klasse (optional)">
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="mod-cls-select"
          >
            <option value="">— keine (Wurzel) —</option>
            {parentOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} · {c.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="bSDD-Referenz (optional, URL)">
          {/* Eingabezeile + Picker-Button nebeneinander */}
          <div className="mod-cls-field-row">
            <input
              type="url"
              value={bsddRef}
              onChange={(e) => setBsddRef(e.target.value)}
              placeholder="https://identifier.buildingsmart.org/…"
              className="mod-cls-input"
              style={{ flex: 1 }}
            />
            {/* bSDD-Picker öffnet ein Sub-Modal mit Suchergebnissen der bSDD-API */}
            <button
              type="button"
              title="bSDD-Picker öffnen"
              onClick={() => setPickerOpen(true)}
              className="mod-cls-btn-secondary mod-cls-btn-bsdd"
            >
              bSDD suchen
            </button>
          </div>
        </Field>

        {/* bSDD-Picker Sub-Modal — öffnet sich über diesem Dialog */}
        {pickerOpen && (
          <BsddPickerModal
            initialQuery={code.trim() || bsddRef.trim()}
            onSelect={(ref) => setBsddRef(ref.uri)}
            onClose={() => setPickerOpen(false)}
          />
        )}

        <Field label="Uniclass-Code (optional)">
          <input
            type="text"
            value={uniclass}
            onChange={(e) => setUniclass(e.target.value)}
            placeholder="z.B. Pr_30_61_56"
            className="mod-cls-input"
          />
        </Field>
      </div>

      <div className="mod-cls-dialog-footer">
        <button
          type="button"
          onClick={onClose}
          className="mod-cls-btn-secondary"
        >
          Abbrechen
        </button>
        <button
          type="button"
          disabled={isSubmitDisabled}
          onClick={() => void handleSubmit()}
          className="mod-cls-btn-primary"
        >
          {saving ? "Wird gespeichert…" : target ? "Speichern" : "Anlegen"}
        </button>
      </div>
    </dialog>
  );
}

/**
 * @module packages/module-classification/src/views/import-dialog
 *
 * Bulk-Import-Dialog für IFC-Entities als TwinClass-Einträge.
 *
 * Zeigt alle in den geladenen Modellen vorhandenen `TwinEntity.class.ifcEntity`-
 * Werte, die noch nicht als TwinClass-Code existieren. Nutzer kann per
 * Checkbox auswählen, alle/keine umschalten und den Bulk-Create triggern.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { makeDraggable, openCentered } from "@thatopen4d/plugin-sdk/ui";
import { formatIfcEntityName } from "@thatopen4d/plugin-sdk/twin";

interface ImportDialogProps {
  candidates: string[];
  onClose: () => void;
  onSubmit: (ifcEntities: string[]) => Promise<void>;
}

export function ImportDialog({
  candidates,
  onClose,
  onSubmit,
}: ImportDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set(candidates));
  const [submitting, setSubmitting] = useState(false);

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

  const toggle = (ifc: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(ifc)) next.delete(ifc);
      else next.add(ifc);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) =>
      prev.size === candidates.length ? new Set() : new Set(candidates),
    );
  };

  const handleSubmit = useCallback(async () => {
    if (selected.size === 0) return;
    setSubmitting(true);
    try {
      await onSubmit(Array.from(selected));
    } finally {
      setSubmitting(false);
    }
  }, [selected, onSubmit]);

  const isSubmitDisabled = selected.size === 0 || submitting;

  return (
    <dialog ref={dialogRef} className="mod-cls-dialog mod-cls-dialog--wide">
      <div className="mod-cls-dialog-header">
        <bim-icon
          icon="solar:import-bold"
          className="mod-cls-dialog-header-icon"
        />
        <span className="mod-cls-dialog-header-title">
          IFC-Entities als Klassen übernehmen
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

      <div className="mod-cls-import-toolbar">
        <button
          type="button"
          onClick={toggleAll}
          className="mod-cls-btn-secondary mod-cls-btn-secondary--compact"
        >
          {selected.size === candidates.length
            ? "Keine auswählen"
            : "Alle auswählen"}
        </button>
        <span className="mod-cls-import-counter">
          {selected.size} von {candidates.length} gewählt
        </span>
      </div>

      {candidates.length === 0 ? (
        <div className="mod-cls-pad-info mod-cls-pad-info--center">
          Alle im Modell vorkommenden IFC-Entities sind bereits als Klasse
          vorhanden.
          <br />
          Nichts zu importieren.
        </div>
      ) : (
        <div className="mod-cls-import-list">
          {candidates.map((ifc) => (
            <label key={ifc} className="mod-cls-import-item">
              <input
                type="checkbox"
                checked={selected.has(ifc)}
                onChange={() => toggle(ifc)}
              />
              <span className="mod-cls-import-item-ifc">{ifc}</span>
              <span className="mod-cls-import-item-mapped">
                → {formatIfcEntityName(ifc)}
              </span>
            </label>
          ))}
        </div>
      )}

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
          {submitting ? "Wird importiert…" : `${selected.size} importieren`}
        </button>
      </div>
    </dialog>
  );
}

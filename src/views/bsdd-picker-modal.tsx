/**
 * @module packages/module-classification/src/views/bsdd-picker-modal
 *
 * Sub-Modal für die interaktive bSDD-Klassen-Auswahl.
 *
 * Öffnet sich über dem ClassEditorDialog, erlaubt eine Freitextsuche gegen
 * den bSDD-Server-Proxy und überträgt die gewählte URI direkt in das
 * `bsddRef`-Feld des übergeordneten Formulars.
 *
 * Suche wird debounced (300 ms) ausgelöst — verhindert zu viele Requests
 * beim Tippen. Standardmäßig ist das Such-Feld mit `initialQuery` befüllt
 * (= aktueller Code-Wert im Haupt-Dialog).
 */

import { useEffect, useRef, useState } from "react";
import { makeDraggable, openCentered } from "@thatopen4d/plugin-sdk/ui";
import { searchBsddClasses, type BsddClassRef } from "../service";

// ── BsddResultRow ───────────────────────────────────────────────────────────

/**
 * Einzelne Ergebnis-Zeile im bSDD-Picker.
 * Zeigt Label, optionalen IFC-Entity-Namen und einen verkürzten URI-Hinweis.
 */
function BsddResultRow({
  ref_,
  onSelect,
}: {
  ref_: BsddClassRef;
  onSelect: () => void;
}) {
  // URI-Kurzdarstellung: nur den letzten Pfad-Abschnitt zeigen
  const uriShort = ref_.uri.split("/").pop() ?? ref_.uri;

  return (
    <button
      type="button"
      onClick={onSelect}
      title={ref_.uri}
      className="mod-cls-bsdd-result-row"
    >
      <div className="mod-cls-bsdd-result-label">
        {ref_.label}
        {ref_.ifcEntity && (
          <span className="mod-cls-bsdd-result-ifc">{ref_.ifcEntity}</span>
        )}
      </div>
      <div className="mod-cls-bsdd-result-uri" title={ref_.uri}>
        {uriShort}
      </div>
    </button>
  );
}

// ── BsddPickerModal ─────────────────────────────────────────────────────────

interface BsddPickerModalProps {
  initialQuery: string;
  onSelect: (ref: BsddClassRef) => void;
  onClose: () => void;
}

export function BsddPickerModal({
  initialQuery,
  onSelect,
  onClose,
}: BsddPickerModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<BsddClassRef[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Dialog öffnen und Backdrop-Close verdrahten
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

  // Initiale Suche beim Öffnen, falls ein Query vorhanden ist
  useEffect(() => {
    if (initialQuery.trim()) {
      void doSearch(initialQuery.trim());
    }
    // Einmalig beim Mount — `initialQuery` aus Closure ist bewusst kein Update-Dep
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced Suche bei Query-Änderung (300 ms)
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setSearchError(null);
      return;
    }
    const timer = setTimeout(() => void doSearch(trimmed), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  async function doSearch(q: string) {
    setLoading(true);
    setSearchError(null);
    try {
      const { results: hits } = await searchBsddClasses(q, 20);
      setResults(hits);
    } catch (e) {
      console.debug("[bsdd-picker] Suche fehlgeschlagen:", e);
      setSearchError("bSDD-Suche nicht verfügbar. Bitte URI manuell eingeben.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <dialog ref={dialogRef} className="mod-cls-dialog mod-cls-dialog--bsdd">
      <div className="mod-cls-dialog-header">
        <bim-icon
          icon="solar:database-bold"
          className="mod-cls-dialog-header-icon"
        />
        <span className="mod-cls-dialog-header-title">bSDD-Picker</span>
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

      <div className="mod-cls-bsdd-search">
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="IFC-Entity oder Suchbegriff eingeben…"
          className="mod-cls-input mod-cls-bsdd-search-input"
        />
        {searchError && (
          <div className="mod-cls-bsdd-search-error">{searchError}</div>
        )}
      </div>

      <div className="mod-cls-bsdd-results">
        {loading ? (
          <div className="mod-cls-pad-info mod-cls-pad-info--center">
            Suche in bSDD…
          </div>
        ) : results.length === 0 && query.trim() ? (
          <div className="mod-cls-pad-info mod-cls-pad-info--center mod-cls-pad-info--faded">
            Keine Treffer für „{query.trim()}"
          </div>
        ) : results.length === 0 ? (
          <div className="mod-cls-pad-info mod-cls-pad-info--center mod-cls-pad-info--faded">
            Suchbegriff eingeben, um bSDD-Klassen zu finden.
          </div>
        ) : (
          results.map((ref) => (
            <BsddResultRow
              key={ref.uri}
              ref_={ref}
              onSelect={() => {
                onSelect(ref);
                onClose();
              }}
            />
          ))
        )}
      </div>

      <div className="mod-cls-dialog-footer">
        <button
          type="button"
          onClick={onClose}
          className="mod-cls-btn-secondary"
        >
          Abbrechen
        </button>
      </div>
    </dialog>
  );
}

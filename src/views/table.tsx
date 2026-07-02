/**
 * @module packages/module-classification/src/views/table
 * Tabellen-Header + einzelne Klassen-Zeile.
 *
 * Layout ist per CSS-Grid in `.mod-cls-grid` definiert. Indentation
 * über `--indent`-Custom-Property (dynamisch pro Zeile), alles andere
 * lebt in `panel.css`.
 */

import type { TwinClassRow } from "@thatopen4d/plugin-sdk/shared";
import type { CSSProperties } from "react";
import { ActionBtn, formatDateTime } from "@thatopen4d/plugin-sdk/ui";

const INDENT_PX = 16;

export function TableHeader() {
  return (
    <div className="mod-cls-grid mod-cls-table-header">
      <div>Code</div>
      <div>Label</div>
      <div>bSDD / Uniclass</div>
      <div>Erstellt</div>
      <div>Kinder</div>
      <div className="mod-cls-col-right">Aktionen</div>
    </div>
  );
}

interface ClassRowProps {
  row: TwinClassRow & { depth: number };
  canWrite: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function ClassRow({ row, canWrite, onEdit, onDelete }: ClassRowProps) {
  const codeStyle: CSSProperties = { paddingLeft: row.depth * INDENT_PX };
  return (
    <div className="mod-cls-grid mod-cls-row">
      <div className="mod-cls-cell-code" style={codeStyle} title={row.code}>
        {row.depth > 0 && <span className="mod-cls-cell-indent">↳</span>}
        {row.code}
      </div>
      <div className="mod-cls-cell-label" title={row.label}>
        {row.label}
      </div>
      <div className="mod-cls-cell-meta">
        {row.bsddRef ? (
          <a
            className="mod-cls-cell-bsdd-link"
            href={row.bsddRef}
            target="_blank"
            rel="noreferrer"
            title={row.bsddRef}
          >
            bSDD ↗
          </a>
        ) : (
          <span className="mod-cls-cell-meta-empty">—</span>
        )}
        {row.uniclass && (
          <span className="mod-cls-cell-meta-ellipsis" title={row.uniclass}>
            {row.uniclass}
          </span>
        )}
      </div>
      <div className="mod-cls-cell-created">
        {formatDateTime(row.createdAt)}
      </div>
      <div className="mod-cls-cell-kind">
        {row.parentId ? "Unterklasse" : "Wurzel"}
      </div>
      <div className="mod-cls-row-actions">
        {canWrite ? (
          <>
            <ActionBtn
              title="Bearbeiten"
              onClick={onEdit}
              icon="solar:pen-bold"
            />
            <ActionBtn
              title="Löschen"
              onClick={onDelete}
              icon="solar:trash-bin-minimalistic-bold"
              variant="danger"
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

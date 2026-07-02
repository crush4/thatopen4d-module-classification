(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode(".mod-cls-grid{display:grid;grid-template-columns:140px 1fr 140px 120px 120px 90px;gap:.75rem;align-items:center}.mod-cls-table-header{padding:.4rem 1rem;border-bottom:1px solid var(--bim-ui_bg-contrast-40);font-size:.58rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--bim-ui_bg-contrast-60);position:sticky;top:0;z-index:1;background:color-mix(in srgb,var(--bim-ui_bg-base) 97%,transparent)}.mod-cls-row{padding:.5rem 1rem;border-bottom:1px solid var(--bim-ui_bg-contrast-20);background:transparent;transition:background .1s}.mod-cls-row:hover{background:#ffffff0a}.mod-cls-col-right{text-align:right}.mod-cls-cell-code{display:flex;align-items:center;font-size:.72rem;font-family:ui-monospace,monospace;color:var(--bim-ui_bg-contrast-100);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mod-cls-cell-indent{margin-right:6px;color:var(--bim-ui_bg-contrast-40)}.mod-cls-cell-label{font-size:.76rem;color:var(--bim-ui_bg-contrast-100);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mod-cls-cell-meta{font-size:.7rem;color:var(--bim-ui_bg-contrast-60);display:flex;flex-direction:column;gap:2px;overflow:hidden}.mod-cls-cell-meta-ellipsis{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mod-cls-cell-bsdd-link{color:#3b82f6;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mod-cls-cell-meta-empty{color:var(--bim-ui_bg-contrast-40)}.mod-cls-cell-created,.mod-cls-cell-kind{font-size:.66rem;color:var(--bim-ui_bg-contrast-60)}.mod-cls-row-actions{display:flex;gap:4px;justify-content:flex-end}.mod-cls-dialog{padding:0;border:1px solid var(--bim-ui_bg-contrast-40);border-radius:8px;background:var(--bim-ui_bg-contrast-10);color:var(--bim-ui_bg-contrast-100);min-width:420px;max-width:560px}.mod-cls-dialog--wide{min-width:480px;max-height:80vh}.mod-cls-dialog--bsdd{min-width:480px;max-width:600px;max-height:80vh;display:flex;flex-direction:column;z-index:1001}.mod-cls-dialog-header{padding:.75rem 1rem;border-bottom:1px solid var(--bim-ui_bg-contrast-20);display:flex;align-items:center;gap:.5rem;cursor:move;-webkit-user-select:none;user-select:none}.mod-cls-dialog-header-icon{font-size:1rem;color:var(--bim-ui_main-base, #f97316)}.mod-cls-dialog-header-title{font-weight:600;font-size:.85rem}.mod-cls-dialog-header-spacer{flex:1}.mod-cls-dialog-body{padding:1rem;display:flex;flex-direction:column;gap:10px}.mod-cls-dialog-footer{padding:.6rem 1rem;border-top:1px solid var(--bim-ui_bg-contrast-20);display:flex;justify-content:flex-end;gap:8px}.mod-cls-close-btn{width:26px;height:26px;background:transparent;border:none;color:var(--bim-ui_bg-contrast-60);font-size:1.2rem;line-height:1;cursor:pointer;border-radius:4px}.mod-cls-input{padding:.35rem .6rem;background:var(--bim-ui_bg-contrast-20);border:1px solid var(--bim-ui_bg-contrast-40);border-radius:4px;color:var(--bim-ui_bg-contrast-100);font-size:.75rem;font-family:inherit;outline:none}.mod-cls-select{padding:.35rem .6rem;background:var(--bim-ui_bg-contrast-20);border:1px solid var(--bim-ui_bg-contrast-40);border-radius:4px;color:var(--bim-ui_bg-contrast-80);font-size:.72rem;font-family:inherit;outline:none;cursor:pointer}.mod-cls-btn-primary{padding:.4rem 1rem;background:var(--bim-ui_main-base, #f97316);border:1px solid var(--bim-ui_main-base, #f97316);color:#fff;font-weight:600;font-size:.75rem;font-family:inherit;border-radius:4px;cursor:pointer}.mod-cls-btn-primary:disabled{opacity:.5;cursor:not-allowed}.mod-cls-btn-secondary{padding:.4rem 1rem;background:var(--bim-ui_bg-contrast-20);border:1px solid var(--bim-ui_bg-contrast-40);color:var(--bim-ui_bg-contrast-80);font-size:.75rem;font-family:inherit;border-radius:4px;cursor:pointer}.mod-cls-btn-secondary--compact{padding:.25rem .6rem;font-size:.68rem}.mod-cls-btn-bsdd{padding:.35rem .6rem;font-size:.68rem;white-space:nowrap;flex-shrink:0}.mod-cls-field-row{display:flex;gap:6px;align-items:center}.mod-cls-toolbar-counter{font-size:.62rem;color:var(--bim-ui_bg-contrast-60);white-space:nowrap}.mod-cls-pad-info{padding:1rem;font-size:.75rem;color:var(--bim-ui_bg-contrast-60)}.mod-cls-pad-info--error{color:var(--accent-red, #ef4444)}.mod-cls-pad-info--center{text-align:center}.mod-cls-pad-info--faded{color:var(--bim-ui_bg-contrast-40)}.mod-cls-import-toolbar{padding:.75rem 1rem;border-bottom:1px solid var(--bim-ui_bg-contrast-20);display:flex;align-items:center;gap:10px}.mod-cls-import-counter{font-size:.68rem;color:var(--bim-ui_bg-contrast-60)}.mod-cls-import-list{max-height:50vh;overflow:auto;padding:.25rem 0}.mod-cls-import-item{display:flex;align-items:center;gap:10px;padding:.4rem 1rem;cursor:pointer;font-size:.75rem;color:var(--bim-ui_bg-contrast-100)}.mod-cls-import-item-ifc{font-family:ui-monospace,monospace;color:var(--bim-ui_bg-contrast-80);min-width:180px}.mod-cls-import-item-mapped{color:var(--bim-ui_bg-contrast-60)}.mod-cls-bsdd-search{padding:.75rem 1rem;border-bottom:1px solid var(--bim-ui_bg-contrast-20)}.mod-cls-bsdd-search-input{width:100%;box-sizing:border-box}.mod-cls-bsdd-search-error{margin-top:6px;font-size:.68rem;color:var(--accent-red, #ef4444)}.mod-cls-bsdd-results{flex:1;overflow-y:auto;min-height:120px;max-height:380px}.mod-cls-bsdd-result-row{display:flex;flex-direction:column;align-items:flex-start;width:100%;padding:.5rem 1rem;border:none;border-bottom:1px solid var(--bim-ui_bg-contrast-20);background:transparent;cursor:pointer;text-align:left;transition:background .1s}.mod-cls-bsdd-result-row:hover{background:#ffffff0f}.mod-cls-bsdd-result-label{font-size:.76rem;font-weight:600;color:var(--bim-ui_bg-contrast-100)}.mod-cls-bsdd-result-ifc{margin-left:8px;font-size:.66rem;font-weight:400;font-family:ui-monospace,monospace;color:var(--bim-ui_bg-contrast-60)}.mod-cls-bsdd-result-uri{font-size:.62rem;color:var(--bim-ui_bg-contrast-40);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}")),document.head.appendChild(o)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
import { createPlugin as Y } from "@thatopen4d/plugin-sdk/manifest";
import { registerReactPanel as Z } from "@thatopen4d/plugin-sdk/registry";
import { projectContext as ee, onProjectLoaded as O, onProjectUnloaded as H, getAuthState as le, PANEL_IDS as J } from "@thatopen4d/plugin-sdk/host";
import { jsxs as o, jsx as l, Fragment as M } from "react/jsx-runtime";
import { useRef as W, useState as f, useEffect as L, useMemo as T, useCallback as I } from "react";
import { formatDateTime as ne, ActionBtn as q, openCentered as U, makeDraggable as $, Field as P, toast as K, confirmDialog as se, ModulePanel as G, ModulePanelHeader as V, EmptyState as _, ModulePanelButton as X, ModulePanelToolbar as te, ModulePanelBody as ae } from "@thatopen4d/plugin-sdk/ui";
import { formatIfcEntityName as Q, SchemaRegistry as ie, ClassRegistry as ce, EntityRegistry as oe } from "@thatopen4d/plugin-sdk/twin";
import { listTwinClasses as re, updateTwinClass as de, createTwinClass as me, deleteTwinClass as ue, importTwinClasses as he } from "@thatopen4d/api-clients/twin-classes";
import { searchBsdd as pe } from "@thatopen4d/api-clients/bsdd";
import { ApiError as be } from "@thatopen4d/api-clients/client";
const fe = { id: "thatopen4d-classification", displayName: "Klassifikation", version: "1.0.0", engines: { host: "^1.5.1" } }, ge = {
  thatopen4d: fe
};
async function ve(e, n = 20) {
  return pe(e, n);
}
async function ye(e) {
  return re(e);
}
async function Ne(e, n) {
  return me(e, n);
}
async function ke(e, n, a) {
  return de(e, n, a);
}
async function Ce(e, n) {
  return ue(e, n);
}
async function Se(e, n) {
  return he(e, n);
}
function we(e) {
  const n = /* @__PURE__ */ new Map();
  for (const t of e) {
    const b = t.parentId ?? null, h = n.get(b) ?? [];
    h.push(t), n.set(b, h);
  }
  for (const t of n.values())
    t.sort((b, h) => b.code.localeCompare(h.code));
  const a = [], g = (t, b) => {
    const h = n.get(t) ?? [];
    for (const N of h)
      a.push({ ...N, depth: b }), g(N.id, b + 1);
  };
  g(null, 0);
  const i = new Set(a.map((t) => t.id));
  for (const t of e)
    i.has(t.id) || a.push({ ...t, depth: 0 });
  return a;
}
function De(e, n) {
  const a = /* @__PURE__ */ new Set([n]);
  let g = !0;
  for (; g; ) {
    g = !1;
    for (const i of e)
      i.parentId && a.has(i.parentId) && !a.has(i.id) && (a.add(i.id), g = !0);
  }
  return e.filter((i) => !a.has(i.id));
}
const Ie = 16;
function Le() {
  return /* @__PURE__ */ o("div", { className: "mod-cls-grid mod-cls-table-header", children: [
    /* @__PURE__ */ l("div", { children: "Code" }),
    /* @__PURE__ */ l("div", { children: "Label" }),
    /* @__PURE__ */ l("div", { children: "bSDD / Uniclass" }),
    /* @__PURE__ */ l("div", { children: "Erstellt" }),
    /* @__PURE__ */ l("div", { children: "Kinder" }),
    /* @__PURE__ */ l("div", { className: "mod-cls-col-right", children: "Aktionen" })
  ] });
}
function Ee({ row: e, canWrite: n, onEdit: a, onDelete: g }) {
  const i = { paddingLeft: e.depth * Ie };
  return /* @__PURE__ */ o("div", { className: "mod-cls-grid mod-cls-row", children: [
    /* @__PURE__ */ o("div", { className: "mod-cls-cell-code", style: i, title: e.code, children: [
      e.depth > 0 && /* @__PURE__ */ l("span", { className: "mod-cls-cell-indent", children: "↳" }),
      e.code
    ] }),
    /* @__PURE__ */ l("div", { className: "mod-cls-cell-label", title: e.label, children: e.label }),
    /* @__PURE__ */ o("div", { className: "mod-cls-cell-meta", children: [
      e.bsddRef ? /* @__PURE__ */ l(
        "a",
        {
          className: "mod-cls-cell-bsdd-link",
          href: e.bsddRef,
          target: "_blank",
          rel: "noreferrer",
          title: e.bsddRef,
          children: "bSDD ↗"
        }
      ) : /* @__PURE__ */ l("span", { className: "mod-cls-cell-meta-empty", children: "—" }),
      e.uniclass && /* @__PURE__ */ l("span", { className: "mod-cls-cell-meta-ellipsis", title: e.uniclass, children: e.uniclass })
    ] }),
    /* @__PURE__ */ l("div", { className: "mod-cls-cell-created", children: ne(e.createdAt) }),
    /* @__PURE__ */ l("div", { className: "mod-cls-cell-kind", children: e.parentId ? "Unterklasse" : "Wurzel" }),
    /* @__PURE__ */ l("div", { className: "mod-cls-row-actions", children: n ? /* @__PURE__ */ o(M, { children: [
      /* @__PURE__ */ l(
        q,
        {
          title: "Bearbeiten",
          onClick: a,
          icon: "solar:pen-bold"
        }
      ),
      /* @__PURE__ */ l(
        q,
        {
          title: "Löschen",
          onClick: g,
          icon: "solar:trash-bin-minimalistic-bold",
          variant: "danger"
        }
      )
    ] }) : null })
  ] });
}
function Pe({
  ref_: e,
  onSelect: n
}) {
  const a = e.uri.split("/").pop() ?? e.uri;
  return /* @__PURE__ */ o(
    "button",
    {
      type: "button",
      onClick: n,
      title: e.uri,
      className: "mod-cls-bsdd-result-row",
      children: [
        /* @__PURE__ */ o("div", { className: "mod-cls-bsdd-result-label", children: [
          e.label,
          e.ifcEntity && /* @__PURE__ */ l("span", { className: "mod-cls-bsdd-result-ifc", children: e.ifcEntity })
        ] }),
        /* @__PURE__ */ l("div", { className: "mod-cls-bsdd-result-uri", title: e.uri, children: a })
      ]
    }
  );
}
function Ke({
  initialQuery: e,
  onSelect: n,
  onClose: a
}) {
  const g = W(null), [i, t] = f(e), [b, h] = f([]), [N, k] = f(!1), [C, v] = f(null);
  L(() => {
    const c = g.current;
    if (!c) return;
    U(c), $(c, ".mod-cls-dialog-header");
    const m = (y) => {
      y.target === c && a();
    };
    return c.addEventListener("click", m), () => {
      c.removeEventListener("click", m);
      try {
        c.close();
      } catch {
      }
    };
  }, [a]), L(() => {
    e.trim() && d(e.trim());
  }, []), L(() => {
    const c = i.trim();
    if (!c) {
      h([]), v(null);
      return;
    }
    const m = setTimeout(() => {
      d(c);
    }, 300);
    return () => clearTimeout(m);
  }, [i]);
  async function d(c) {
    k(!0), v(null);
    try {
      const { results: m } = await ve(c, 20);
      h(m);
    } catch (m) {
      console.debug("[bsdd-picker] Suche fehlgeschlagen:", m), v("bSDD-Suche nicht verfügbar. Bitte URI manuell eingeben."), h([]);
    } finally {
      k(!1);
    }
  }
  return /* @__PURE__ */ o("dialog", { ref: g, className: "mod-cls-dialog mod-cls-dialog--bsdd", children: [
    /* @__PURE__ */ o("div", { className: "mod-cls-dialog-header", children: [
      /* @__PURE__ */ l(
        "bim-icon",
        {
          icon: "solar:database-bold",
          className: "mod-cls-dialog-header-icon"
        }
      ),
      /* @__PURE__ */ l("span", { className: "mod-cls-dialog-header-title", children: "bSDD-Picker" }),
      /* @__PURE__ */ l("div", { className: "mod-cls-dialog-header-spacer" }),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: a,
          "aria-label": "Dialog schließen",
          className: "mod-cls-close-btn",
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "mod-cls-bsdd-search", children: [
      /* @__PURE__ */ l(
        "input",
        {
          type: "text",
          autoFocus: !0,
          value: i,
          onChange: (c) => t(c.target.value),
          placeholder: "IFC-Entity oder Suchbegriff eingeben…",
          className: "mod-cls-input mod-cls-bsdd-search-input"
        }
      ),
      C && /* @__PURE__ */ l("div", { className: "mod-cls-bsdd-search-error", children: C })
    ] }),
    /* @__PURE__ */ l("div", { className: "mod-cls-bsdd-results", children: N ? /* @__PURE__ */ l("div", { className: "mod-cls-pad-info mod-cls-pad-info--center", children: "Suche in bSDD…" }) : b.length === 0 && i.trim() ? /* @__PURE__ */ o("div", { className: "mod-cls-pad-info mod-cls-pad-info--center mod-cls-pad-info--faded", children: [
      "Keine Treffer für „",
      i.trim(),
      '"'
    ] }) : b.length === 0 ? /* @__PURE__ */ l("div", { className: "mod-cls-pad-info mod-cls-pad-info--center mod-cls-pad-info--faded", children: "Suchbegriff eingeben, um bSDD-Klassen zu finden." }) : b.map((c) => /* @__PURE__ */ l(
      Pe,
      {
        ref_: c,
        onSelect: () => {
          n(c), a();
        }
      },
      c.uri
    )) }),
    /* @__PURE__ */ l("div", { className: "mod-cls-dialog-footer", children: /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: a,
        className: "mod-cls-btn-secondary",
        children: "Abbrechen"
      }
    ) })
  ] });
}
function Re({
  target: e,
  allClasses: n,
  onClose: a,
  onSave: g
}) {
  const i = W(null), [t, b] = f(e?.code ?? ""), [h, N] = f(e?.label ?? ""), [k, C] = f(e?.parentId ?? ""), [v, d] = f(e?.bsddRef ?? ""), [c, m] = f(e?.uniclass ?? ""), [y, E] = f(!1), [S, A] = f(!1);
  L(() => {
    const r = i.current;
    if (!r) return;
    U(r), $(r, ".mod-cls-dialog-header");
    const D = (s) => {
      s.target === r && a();
    };
    return r.addEventListener("click", D), () => {
      r.removeEventListener("click", D);
      try {
        r.close();
      } catch {
      }
    };
  }, [a]);
  const x = T(
    () => e ? De(n, e.id) : n,
    [e, n]
  ), B = I(async () => {
    const r = t.trim(), D = h.trim();
    if (!(!r || !D)) {
      E(!0);
      try {
        await g(
          {
            code: r,
            label: D,
            parentId: k || void 0,
            bsddRef: v.trim() || void 0,
            uniclass: c.trim() || void 0
          },
          e?.id ?? null
        );
      } finally {
        E(!1);
      }
    }
  }, [t, h, k, v, c, e, g]), F = !t.trim() || !h.trim() || y;
  return /* @__PURE__ */ o("dialog", { ref: i, className: "mod-cls-dialog", children: [
    /* @__PURE__ */ o("div", { className: "mod-cls-dialog-header", children: [
      /* @__PURE__ */ l(
        "bim-icon",
        {
          icon: "solar:tag-bold",
          className: "mod-cls-dialog-header-icon"
        }
      ),
      /* @__PURE__ */ l("span", { className: "mod-cls-dialog-header-title", children: e ? `Klasse bearbeiten: ${e.code}` : "Neue Klasse" }),
      /* @__PURE__ */ l("div", { className: "mod-cls-dialog-header-spacer" }),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: a,
          "aria-label": "Dialog schließen",
          className: "mod-cls-close-btn",
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "mod-cls-dialog-body", children: [
      /* @__PURE__ */ l(P, { label: "Code (eindeutig)", children: /* @__PURE__ */ l(
        "input",
        {
          type: "text",
          autoFocus: !e,
          value: t,
          onChange: (r) => b(r.target.value),
          placeholder: "z.B. IfcWall, CLS-042, WND-S",
          className: "mod-cls-input"
        }
      ) }),
      /* @__PURE__ */ l(P, { label: "Label", children: /* @__PURE__ */ l(
        "input",
        {
          type: "text",
          value: h,
          onChange: (r) => N(r.target.value),
          placeholder: "z.B. Wand, Fenster, Beton-Schalung",
          className: "mod-cls-input"
        }
      ) }),
      /* @__PURE__ */ l(P, { label: "Parent-Klasse (optional)", children: /* @__PURE__ */ o(
        "select",
        {
          value: k,
          onChange: (r) => C(r.target.value),
          className: "mod-cls-select",
          children: [
            /* @__PURE__ */ l("option", { value: "", children: "— keine (Wurzel) —" }),
            x.map((r) => /* @__PURE__ */ o("option", { value: r.id, children: [
              r.code,
              " · ",
              r.label
            ] }, r.id))
          ]
        }
      ) }),
      /* @__PURE__ */ l(P, { label: "bSDD-Referenz (optional, URL)", children: /* @__PURE__ */ o("div", { className: "mod-cls-field-row", children: [
        /* @__PURE__ */ l(
          "input",
          {
            type: "url",
            value: v,
            onChange: (r) => d(r.target.value),
            placeholder: "https://identifier.buildingsmart.org/…",
            className: "mod-cls-input",
            style: { flex: 1 }
          }
        ),
        /* @__PURE__ */ l(
          "button",
          {
            type: "button",
            title: "bSDD-Picker öffnen",
            onClick: () => A(!0),
            className: "mod-cls-btn-secondary mod-cls-btn-bsdd",
            children: "bSDD suchen"
          }
        )
      ] }) }),
      S && /* @__PURE__ */ l(
        Ke,
        {
          initialQuery: t.trim() || v.trim(),
          onSelect: (r) => d(r.uri),
          onClose: () => A(!1)
        }
      ),
      /* @__PURE__ */ l(P, { label: "Uniclass-Code (optional)", children: /* @__PURE__ */ l(
        "input",
        {
          type: "text",
          value: c,
          onChange: (r) => m(r.target.value),
          placeholder: "z.B. Pr_30_61_56",
          className: "mod-cls-input"
        }
      ) })
    ] }),
    /* @__PURE__ */ o("div", { className: "mod-cls-dialog-footer", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: a,
          className: "mod-cls-btn-secondary",
          children: "Abbrechen"
        }
      ),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          disabled: F,
          onClick: () => {
            B();
          },
          className: "mod-cls-btn-primary",
          children: y ? "Wird gespeichert…" : e ? "Speichern" : "Anlegen"
        }
      )
    ] })
  ] });
}
function Ae({
  candidates: e,
  onClose: n,
  onSubmit: a
}) {
  const g = W(null), [i, t] = f(new Set(e)), [b, h] = f(!1);
  L(() => {
    const d = g.current;
    if (!d) return;
    U(d), $(d, ".mod-cls-dialog-header");
    const c = (m) => {
      m.target === d && n();
    };
    return d.addEventListener("click", c), () => {
      d.removeEventListener("click", c);
      try {
        d.close();
      } catch {
      }
    };
  }, [n]);
  const N = (d) => {
    t((c) => {
      const m = new Set(c);
      return m.has(d) ? m.delete(d) : m.add(d), m;
    });
  }, k = () => {
    t(
      (d) => d.size === e.length ? /* @__PURE__ */ new Set() : new Set(e)
    );
  }, C = I(async () => {
    if (i.size !== 0) {
      h(!0);
      try {
        await a(Array.from(i));
      } finally {
        h(!1);
      }
    }
  }, [i, a]), v = i.size === 0 || b;
  return /* @__PURE__ */ o("dialog", { ref: g, className: "mod-cls-dialog mod-cls-dialog--wide", children: [
    /* @__PURE__ */ o("div", { className: "mod-cls-dialog-header", children: [
      /* @__PURE__ */ l(
        "bim-icon",
        {
          icon: "solar:import-bold",
          className: "mod-cls-dialog-header-icon"
        }
      ),
      /* @__PURE__ */ l("span", { className: "mod-cls-dialog-header-title", children: "IFC-Entities als Klassen übernehmen" }),
      /* @__PURE__ */ l("div", { className: "mod-cls-dialog-header-spacer" }),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: n,
          "aria-label": "Dialog schließen",
          className: "mod-cls-close-btn",
          children: "×"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "mod-cls-import-toolbar", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: k,
          className: "mod-cls-btn-secondary mod-cls-btn-secondary--compact",
          children: i.size === e.length ? "Keine auswählen" : "Alle auswählen"
        }
      ),
      /* @__PURE__ */ o("span", { className: "mod-cls-import-counter", children: [
        i.size,
        " von ",
        e.length,
        " gewählt"
      ] })
    ] }),
    e.length === 0 ? /* @__PURE__ */ o("div", { className: "mod-cls-pad-info mod-cls-pad-info--center", children: [
      "Alle im Modell vorkommenden IFC-Entities sind bereits als Klasse vorhanden.",
      /* @__PURE__ */ l("br", {}),
      "Nichts zu importieren."
    ] }) : /* @__PURE__ */ l("div", { className: "mod-cls-import-list", children: e.map((d) => /* @__PURE__ */ o("label", { className: "mod-cls-import-item", children: [
      /* @__PURE__ */ l(
        "input",
        {
          type: "checkbox",
          checked: i.has(d),
          onChange: () => N(d)
        }
      ),
      /* @__PURE__ */ l("span", { className: "mod-cls-import-item-ifc", children: d }),
      /* @__PURE__ */ o("span", { className: "mod-cls-import-item-mapped", children: [
        "→ ",
        Q(d)
      ] })
    ] }, d)) }),
    /* @__PURE__ */ o("div", { className: "mod-cls-dialog-footer", children: [
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          onClick: n,
          className: "mod-cls-btn-secondary",
          children: "Abbrechen"
        }
      ),
      /* @__PURE__ */ l(
        "button",
        {
          type: "button",
          disabled: v,
          onClick: () => {
            C();
          },
          className: "mod-cls-btn-primary",
          children: b ? "Wird importiert…" : `${i.size} importieren`
        }
      )
    ] })
  ] });
}
const R = { kind: "list" };
function Be({ components: e }) {
  const [n, a] = f(
    ee.activeProjectId
  );
  L(() => {
    const s = ({ projectId: p }) => a(p), u = () => a(null);
    return O.add(s), H.add(u), () => {
      O.remove(s), H.remove(u);
    };
  }, []);
  const i = le().user?.role === "admin", [t, b] = f([]), [h, N] = f(!1), [k, C] = f(null), [v, d] = f(""), [c, m] = f(R), y = I(async () => {
    if (!n) {
      b([]);
      return;
    }
    N(!0), C(null);
    try {
      const s = await ye(n);
      b(s);
    } catch (s) {
      C(
        s instanceof Error ? s.message : "Fehler beim Laden der Klassen"
      );
    } finally {
      N(!1);
    }
  }, [n]);
  L(() => {
    y();
  }, [y]);
  const E = T(() => {
    const s = v.trim().toLowerCase();
    return s ? t.filter(
      (u) => u.code.toLowerCase().includes(s) || u.label.toLowerCase().includes(s) || (u.bsddRef ?? "").toLowerCase().includes(s) || (u.uniclass ?? "").toLowerCase().includes(s)
    ).sort((u, p) => u.code.localeCompare(p.code)).map((u) => ({ ...u, depth: 0 })) : we(t);
  }, [t, v]), S = I(async () => {
    if (!(!e || !n))
      try {
        e.get(ie).invalidate(), await e.get(ce).loadForProject(n);
      } catch (s) {
        console.debug("[classification] invalidateClassCaches failed:", s);
      }
  }, [e, n]), A = I(
    async (s, u) => {
      if (n)
        try {
          u ? await ke(n, u, s) : await Ne(n, s), m(R), await y(), await S();
        } catch (p) {
          p instanceof be && p.status === 409 ? K.error(
            `Der Code „${s.code}" ist bereits vergeben. Wähle einen anderen Code.`
          ) : K.error(
            p instanceof Error ? p.message : "Speichern fehlgeschlagen (unbekannter Fehler)."
          );
        }
    },
    [n, y, S]
  ), x = I(
    async (s) => {
      if (!n) return;
      const u = t.some((w) => w.parentId === s.id);
      if (await se({
        title: "Klasse löschen",
        message: `Klasse „${s.label}" (${s.code}) wirklich löschen?${u ? `

Hinweis: Kinder werden zur Wurzelebene verschoben.` : ""}`,
        confirmLabel: "Löschen",
        danger: !0
      }))
        try {
          await Ce(n, s.id), await y(), await S();
        } catch (w) {
          K.error(w instanceof Error ? w.message : "Löschen fehlgeschlagen.");
        }
    },
    [n, t, y, S]
  ), B = T(() => new Set(t.map((s) => s.code)), [t]), F = c.kind === "import", r = T(() => {
    if (!e) return [];
    const s = ze(e);
    if (!s) return [];
    const u = /* @__PURE__ */ new Set();
    for (const p of s.values()) {
      const w = p.class?.ifcEntity;
      w && !B.has(w) && u.add(w);
    }
    return Array.from(u).sort();
  }, [e, B, F]), D = I(
    async (s) => {
      if (!n || s.length === 0) return;
      const u = {
        classes: s.map((p) => ({
          code: p,
          label: Q(p)
        }))
      };
      try {
        const p = await Se(n, u);
        m(R), await y(), await S(), K.success(
          `Import abgeschlossen — neu: ${p.imported}, übersprungen: ${p.skipped}`
        );
      } catch (p) {
        K.error(p instanceof Error ? p.message : "Import fehlgeschlagen.");
      }
    },
    [n, y, S]
  );
  return n ? /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ l(
      V,
      {
        icon: "solar:tag-bold",
        title: "Klassifikation",
        actions: i ? /* @__PURE__ */ o(M, { children: [
          /* @__PURE__ */ l(
            X,
            {
              icon: "solar:import-bold",
              title: "Klassen aus geladenen Modellen übernehmen",
              onClick: () => m({ kind: "import" })
            }
          ),
          /* @__PURE__ */ l(
            X,
            {
              icon: "solar:add-circle-bold",
              title: "Neue Klasse anlegen",
              onClick: () => m({ kind: "editor", target: null }),
              variant: "primary"
            }
          )
        ] }) : void 0
      }
    ),
    /* @__PURE__ */ o(te, { children: [
      /* @__PURE__ */ l(
        "input",
        {
          type: "text",
          value: v,
          onChange: (s) => d(s.target.value),
          placeholder: "Code, Label, bSDD oder Uniclass suchen…",
          className: "mod-cls-input",
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ o("span", { className: "mod-cls-toolbar-counter", children: [
        E.length,
        " von ",
        t.length
      ] })
    ] }),
    /* @__PURE__ */ l(ae, { children: h && t.length === 0 ? /* @__PURE__ */ l("div", { className: "mod-cls-pad-info", children: "Lade Klassen…" }) : k ? /* @__PURE__ */ l("div", { className: "mod-cls-pad-info mod-cls-pad-info--error", children: k }) : t.length === 0 ? /* @__PURE__ */ l(
      _,
      {
        icon: "solar:tag-bold",
        title: "Noch keine Klassen",
        message: i ? "Lege eine Klasse manuell an oder übernimm die IFC-Entities aus dem geladenen Modell." : "Sobald ein Admin oder Owner Klassen anlegt, erscheinen sie hier."
      }
    ) : /* @__PURE__ */ o(M, { children: [
      /* @__PURE__ */ l(Le, {}),
      E.map((s) => /* @__PURE__ */ l(
        Ee,
        {
          row: s,
          canWrite: i,
          onEdit: () => m({ kind: "editor", target: s }),
          onDelete: () => {
            x(s);
          }
        },
        s.id
      ))
    ] }) }),
    c.kind === "editor" && /* @__PURE__ */ l(
      Re,
      {
        target: c.target,
        allClasses: t,
        onClose: () => m(R),
        onSave: A
      }
    ),
    c.kind === "import" && /* @__PURE__ */ l(
      Ae,
      {
        candidates: r,
        onClose: () => m(R),
        onSubmit: D
      }
    )
  ] }) : /* @__PURE__ */ o(G, { children: [
    /* @__PURE__ */ l(V, { icon: "solar:tag-bold", title: "Klassifikation" }),
    /* @__PURE__ */ l(
      _,
      {
        icon: "solar:folder-open-bold",
        title: "Kein Projekt geladen",
        message: "Öffne ein Projekt über die Projekt-Pille, um Klassen zu verwalten."
      }
    )
  ] });
}
function ze(e) {
  try {
    return e.get(oe);
  } catch {
    return null;
  }
}
const z = ge.thatopen4d, j = {
  id: z.id,
  displayName: z.displayName,
  version: z.version,
  engines: z.engines,
  contributes: {
    panels: [
      { panelId: J.CLASSIFICATION, title: "Klassifikation", icon: "mdi:tag-multiple-outline" }
    ]
  }
};
async function qe(e) {
  return Y(j, {
    id: j.id,
    title: j.displayName,
    register: () => {
      Z(J.CLASSIFICATION, {
        component: Be,
        title: "Klassifikation"
      });
    },
    init: () => {
    },
    dispose: () => {
    }
  });
}
export {
  qe as default
};
//# sourceMappingURL=plugin.js.map

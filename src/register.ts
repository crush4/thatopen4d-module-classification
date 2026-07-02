/**
 * @module @thatopen4d/module-classification/register
 *
 * Plugin-Bundle-Default-Export fuer das Klassifikations-Plugin (Stage 1).
 * Panel selbst wird via `lazy()` geladen — bSDD-Picker + Klassen-Editor
 * bleiben out-of-bundle bis das Panel geoeffnet wird.
 */

import { createPlugin } from "@thatopen4d/plugin-sdk/manifest";
import { registerReactPanel } from "@thatopen4d/plugin-sdk/registry";
import { PANEL_IDS } from "@thatopen4d/plugin-sdk/host";
import type { PluginHostContext } from "@thatopen4d/plugin-sdk/types";
import pkg from "../package.json";
import { ClassificationPanel } from "./panel";

const tp = pkg.thatopen4d as {
  id: string;
  displayName: string;
  version: string;
  engines: { host: string };
};

const manifest = {
  id: tp.id,
  displayName: tp.displayName,
  version: tp.version,
  engines: tp.engines,
  contributes: {
    panels: [
      { panelId: PANEL_IDS.CLASSIFICATION, title: "Klassifikation", icon: "mdi:tag-multiple-outline" },
    ],
  },
};

export default async function activate(host: PluginHostContext) {
  return createPlugin(manifest, {
    id: manifest.id,
    title: manifest.displayName,
    register: () => {
      registerReactPanel(PANEL_IDS.CLASSIFICATION, {
        component: ClassificationPanel,
        title: "Klassifikation",
      });
    },
    init: () => { void host; },
    dispose: () => {},
  });
}

---
id: initial-extract
type: feature
title: "Initial Extract aus dem ThatOpen4D-Hauptrepo (v1.0.0)"
audience: [developer]
breaking: false
---
Erstes eigenstaendiges Release als Stage-1-Core-Plugin. Frueher unter
`packages/module-classification/` im Hauptrepo. Panel-lokale Hierarchie
von Twin-Klassen (IfcWall -> Klassen-Typ) mit optionaler bSDD-Verknuepfung
und Import aus geladenen Modellen. Kein Cross-Modul-Vertrag.

**Mindest-Host-Version** `^1.5.1` — braucht die SDK-Erweiterungen fuer
`formatIfcEntityName`, `TwinClassRow`, `openCentered` und `formatDateTime`.

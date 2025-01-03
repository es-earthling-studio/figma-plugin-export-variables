import { emit, on, once, showUI } from "@create-figma-plugin/utilities";

import { ResizeWindowHandler, UiReady } from "./types";

export default function () {
  on<ResizeWindowHandler>(
    "RESIZE_WINDOW",
    function (windowSize: { width: number; height: number }) {
      const { width, height } = windowSize;
      figma.ui.resize(width, height);
    }
  );

  once<UiReady>("UI_READY", function () {
    // Sync collections
    const collections = figma.variables.getLocalVariableCollections();
    emit(
      "RES_COLLECTIONS",
      collections.map((col) => ({
        id: col.id,
        name: col.name,
        modes: col.modes,
        variableIds: col.variableIds,
        hiddenFromPublishing: col.hiddenFromPublishing,
      }))
    );

    // Sync variables
    const variables = figma.variables.getLocalVariables();
    emit(
      "RES_VARIABLES",
      variables.map((v) => ({
        id: v.id,
        name: v.name,
        resolvedType: v.resolvedType,
        valuesByMode: v.valuesByMode,
        hiddenFromPublishing: v.hiddenFromPublishing,
        //@ts-expect-error deletedButReferenced not typed
        deletedButReferenced: v.deletedButReferenced,
      }))
    );
  });

  showUI({
    height: 620,
    width: 680,
    themeColors: true,
  });
}

import "!prismjs/themes/prism.css";

import { render, useWindowResize } from "@create-figma-plugin/ui";
import { h } from "preact";
import { AppearanceConfig } from "./components/AppearanceConfig";
import "!./styles/styles.css";
import '!./styles/global.css'

import { useEffect } from "react";
import { emit } from "@create-figma-plugin/utilities";
import { Preview } from "./components/Preview";
import { GeneralConfig } from "./components/GeneralConfig";
import { useSynFigma } from "./hooks/useSyncFigma";
import { ResizeWindowHandler } from "./types";

function Plugin() {
  function onWindowResize(windowSize: { width: number; height: number }) {
    emit<ResizeWindowHandler>("RESIZE_WINDOW", windowSize);
  }

  useWindowResize(onWindowResize, {
    maxHeight: 1000,
    maxWidth: 1000,
    minHeight: 120,
    minWidth: 120,
    resizeBehaviorOnDoubleClick: "minimize",
  });

  useEffect(() => {
    emit("UI_READY");
  }, []);

  useSynFigma();

  return (
    <div class="ui">
      {/* Left column */}
      <div class="left-col">
        <AppearanceConfig />
        <GeneralConfig />
      </div>
      {/* Right column */}
      <div class="right-col">
        <Preview />
      </div>
    </div>
  );
}

export default render(Plugin);

export const inlineStyles = {
  leftCol: {
    borderRight: "1px solid var(--figma-color-border)",
    overflow: "auto",
  },
  rightCol: {
    backgroundColor: "var(--figma-color-bg-secondary)",
  },
  preview: {
    backgroundColor: "var(--figma-color-bg-disabled)",
  },
};

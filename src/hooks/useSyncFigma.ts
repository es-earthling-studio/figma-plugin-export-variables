import { useEffect } from "preact/hooks";
import { useFigmaStore } from "../store/figma";
import { emit, on } from "@create-figma-plugin/utilities";

export const useSynFigma = () => {
  const { updateCollections, updateVariables } = useFigmaStore((state) => ({
    updateCollections: state.updateCollections,
    updateVariables: state.updateVariables,
  }));

  useEffect(() => {
    on("RES_COLLECTIONS", (data) => {
      updateCollections(data);
    });
    on("RES_VARIABLES", (data) => {
      updateVariables(data);
    });
  });
};

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { NamingConvetionType, VariableType } from "../types";
import { storage } from "../utils/storage";

interface SettingsState {
  namingConvention: NamingConvetionType;
  variableTypes: VariableType[];
  colorFormat: string;
  showHiddenFromPublishingVariables: boolean;
  shouldResolveVariableAlias: boolean;
  shouldGroupModes: boolean;
  updateNamingConvention: (nc: NamingConvetionType) => void;
  updateVariableTypes: (type: VariableType, add: boolean) => void;
}

export const useSettingsStore = create(
  persist<SettingsState>(
    (set) => ({
      namingConvention: "dot",
      variableTypes: ["COLOR", "BOOLEAN", "FLOAT", "STRING"],
      colorFormat: "hex",
      showHiddenFromPublishingVariables: true,
      shouldResolveVariableAlias: true,
      shouldGroupModes: true,
      updateNamingConvention: (nc) => set(() => ({ namingConvention: nc })),
      updateVariableTypes: (type, add) =>
        set((state) => ({
          variableTypes: add
            ? [...state.variableTypes, type]
            : state.variableTypes.filter((t) => t !== type),
        })),
    }),
    { name: "ui-settings", storage: createJSONStorage(() => storage) }
  )
);

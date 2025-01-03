import { create } from "zustand";

interface FigmaState {
  collections: VariableCollection[];
  variables: Variable[];
  updateCollections: (data: VariableCollection[]) => void;
  updateVariables: (data: Variable[]) => void;
}

export const useFigmaStore = create<FigmaState>((set) => ({
  collections: [],
  variables: [],
  updateCollections: (data: VariableCollection[]) => {
    set(() => ({
      collections: data,
    }));
  },
  updateVariables: (data: Variable[]) => {
    set(() => ({
      variables: data,
    }));
  }
}));

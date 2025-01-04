import _ from "lodash";
import { useFigmaStore } from "../store/figma";
import { useSettingsStore } from "../store/settings";
import { NamingConvetionType } from "../types";

export const useJsonPreviewString = () => {
  const { collections, variables } = useFigmaStore();
  const {
    namingConvention,
    variableTypes,
    showHiddenFromPublishingVariables,
    shouldResolveVariableAlias,
    shouldHideSingleMode,
  } = useSettingsStore();

  const extractVariableForMode = (variableIds: string[], modeId: string) => {
    return variableIds.reduce((varMap, id) => {
      const matchedVariable = variables.find((v) => v.id === id);
      if (
        matchedVariable &&
        variableTypes.includes(matchedVariable.resolvedType) &&
        (showHiddenFromPublishingVariables
          ? true
          : matchedVariable?.hiddenFromPublishing === false)
      ) {
        const name = formatTokenName(matchedVariable.name, namingConvention);
        varMap[name] = resolveVariableValue(id, modeId);
      }
      return varMap;
    }, {} as any);
  };

  const resolveVariableValue = (
    variableId: string,
    modeId: string,
    isAlias = false,
    currentLevel = 0
  ) => {
    const matchedVariable = variables.find(
      //@ts-expect-error deletedButReferenced not typed
      (v) => v.id === variableId && v.deletedButReferenced !== true
    );

    // Recursive if is variable alias
    if (matchedVariable) {
      const modeValue =
        matchedVariable.valuesByMode[modeId] ||
        Object.values(matchedVariable.valuesByMode)[0];
      if (modeValue) {
        if (
          (modeValue as VariableAlias).type === "VARIABLE_ALIAS" &&
          (shouldResolveVariableAlias ||
            (!shouldResolveVariableAlias && currentLevel < 1))
        ) {
          return resolveVariableValue(
            (modeValue as VariableAlias).id,
            modeId,
            !shouldResolveVariableAlias,
            currentLevel + 1
          );
        } else {
          // Return raw value
          if (isAlias)
            return formatTokenName(matchedVariable.name, namingConvention);
          if (modeValue.hasOwnProperty("r")) return rgbToHex(modeValue as RGBA);
          return modeValue;
        }
      }
    }
  };

  return collections?.reduce((collectionMap, col) => {
    if (
      showHiddenFromPublishingVariables
        ? true
        : col.hiddenFromPublishing === false
    ) {
      const collectionName = formatTokenName(col.name || "", "camel");
      if (shouldHideSingleMode && col.modes.length === 1) {
        collectionMap[collectionName] = extractVariableForMode(
          col.variableIds,
          col.modes[0].modeId
        );
      } else {
        collectionMap[collectionName] = col.modes.reduce((modeMap, mode) => {
          modeMap[formatTokenName(mode.name, "camel")] = extractVariableForMode(
            col.variableIds,
            mode.modeId
          );
          return modeMap;
        }, {} as any);
      }
    }
    return collectionMap;
  }, {} as any);
};

const formatTokenName = (input: string, format: NamingConvetionType) => {
  // Split the input string by '/' to process each segment
  let segments = input.split("/");

  // Map the segments to handle camel case formatting for each word after the first
  segments = segments.map((segment, index) => {
    if (index > 0) {
      return _.camelCase(segment);
    }
    return segment;
  });

  // Join segments based on the format
  switch (format) {
    case "dot":
      return segments.join(".");
    case "kebab":
      return segments.join("-");
    case "snake":
      return segments.join("_");
    case "camel":
      return _.camelCase(input);
    default:
      throw new Error("Invalid format. Use 'dot', 'kebab', or 'camel'.");
  }
};

function rgbToHex({ r, g, b, a }: RGBA) {
  if (a === undefined) {
    a = 1;
  }

  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join("");
  return `#${hex}` + (a !== 1 ? toHex(a) : "");
}

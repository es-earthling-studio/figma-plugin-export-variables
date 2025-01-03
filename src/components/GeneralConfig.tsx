import {
  Checkbox,
  Dropdown,
  Muted,
  Stack,
  Text,
  Toggle,
} from "@create-figma-plugin/ui";
import { NAMING_CONVENTIONS } from "../utils/constants";
import { h, JSX } from "preact";
import { Section } from "./ui/Section";
import { useSettingsStore } from "../store/settings";
import { NamingConvetionType, VariableType } from "../types";

export const GeneralConfig = () => {
  const {
    namingConvention,
    variableTypes,
    showHiddenFromPublishingVariables,
    shouldResolveVariableAlias,
    updateNamingConvention,
    updateVariableTypes,
  } = useSettingsStore();

  function handleChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    updateNamingConvention(newValue as NamingConvetionType);
  }

  const handlVariableTypeChange =
    (variableType: VariableType) =>
    (event: JSX.TargetedEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.checked;
      updateVariableTypes(variableType, newValue);
    };

  const handleHiddenFromPublishingChange = (
    event: JSX.TargetedEvent<HTMLInputElement>
  ) => {
    const newValue = event.currentTarget.checked;
    useSettingsStore.setState({ showHiddenFromPublishingVariables: newValue });
  };

  const handleResolveAliasChange = (
    event: JSX.TargetedEvent<HTMLInputElement>
  ) => {
    const newValue = event.currentTarget.checked;
    useSettingsStore.setState({ shouldResolveVariableAlias: newValue });
  };

  return (
    <Section hasDivider title="Variable">
      <Stack space="medium">
        <Stack space="extraSmall">
          <Text>
            <Muted>Type</Muted>
          </Text>
          <Toggle
            onChange={handlVariableTypeChange("COLOR")}
            value={variableTypes.includes("COLOR")}
          >
            <Text>Color</Text>
          </Toggle>
          <Toggle
            onChange={handlVariableTypeChange("STRING")}
            value={variableTypes.includes("STRING")}
          >
            <Text>String</Text>
          </Toggle>
          <Toggle
            onChange={handlVariableTypeChange("FLOAT")}
            value={variableTypes.includes("FLOAT")}
          >
            <Text>Number</Text>
          </Toggle>
          <Toggle
            onChange={handlVariableTypeChange("BOOLEAN")}
            value={variableTypes.includes("BOOLEAN")}
          >
            <Text>Boolean</Text>
          </Toggle>
        </Stack>
        <Stack space="extraSmall">
          <Text>
            <Muted>Naming convention</Muted>
          </Text>
          <Dropdown
            onChange={handleChange}
            options={NAMING_CONVENTIONS}
            value={namingConvention}
            variant="border"
          />
        </Stack>
        <Checkbox
          onChange={handleHiddenFromPublishingChange}
          value={showHiddenFromPublishingVariables}
        >
          <Text>Include hidden variables</Text>
        </Checkbox>
        <Checkbox
          onChange={handleResolveAliasChange}
          value={shouldResolveVariableAlias}
        >
          <Text>Resolve variable alias</Text>
        </Checkbox>
      </Stack>
    </Section>
  );
};

import {
  Dropdown,
  DropdownOption,
  Muted,
  Text,
  Toggle,
} from "@create-figma-plugin/ui";
import { useState } from "preact/hooks";
import { h, JSX } from "preact";
import { useFigmaStore } from "../store/figma";
import { Section } from "./ui/Section";
import { useSettingsStore } from "../store/settings";

export function AppearanceConfig() {
  const { collections } = useFigmaStore((state) => ({
    collections: state.collections,
  }));

  const { shouldGroupModes } = useSettingsStore();

  const options = generateOptions(collections);
  const [selected, setSelected] = useState("all");

  function handleCollectionChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
    setSelected(newValue);
  }

  function handleAppearanceChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.value;
  }

  function handleGroupByModeChange(event: JSX.TargetedEvent<HTMLInputElement>) {
    const newValue = event.currentTarget.checked;
    useSettingsStore.setState({shouldGroupModes: newValue});
  }

  return (
    <Section title="Collection">
      <Dropdown
        onChange={handleCollectionChange}
        options={options}
        value={selected}
        variant="border"
      />

      <div class="appearance-list">
        <Toggle onChange={handleGroupByModeChange} value={shouldGroupModes}>
          <Text>Group modes</Text>
        </Toggle>
        {shouldGroupModes === false &&
          collections.find((c) => c.modes?.length && c.modes.length >= 2) &&
          collections.map((col) => {
            if (col.modes?.length && col.modes.length >= 2) {
              const modeOptions = col.modes.map((m) => ({
                text: m.name,
                value: m.modeId,
              }));
              return (
                <div class="appearance-row">
                  <Text style={{ flex: 1 }}>
                    <Muted>{col.name}</Muted>
                  </Text>
                  <Dropdown
                    style={{ flex: 1 }}
                    onChange={handleAppearanceChange}
                    options={modeOptions}
                    value={modeOptions[0].value}
                    variant="border"
                  />
                </div>
              );
            }
            return null;
          })}
      </div>
    </Section>
  );
}

const generateOptions = (
  collections?: Partial<VariableCollection>[]
): DropdownOption[] => {
  if (!collections)
    return [
      {
        value: "all",
        text: "All",
      },
    ];
  const collectionsOptions = collections.map(
    (col) =>
      ({
        value: col.id,
        text: col.name,
      } as DropdownOption)
  );

  return [
    {
      value: "all",
      text: "All",
    },
    {
      value: "custom",
      text: "Custom",
    },
    "-",
    {
      header: "Single selection",
    },
    ...collectionsOptions,
  ];
};

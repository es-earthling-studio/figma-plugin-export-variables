import {
  Checkbox,
  Dropdown,
  DropdownOption,
  Muted,
  Text,
} from "@create-figma-plugin/ui";
import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import { useFigmaStore } from "../store/figma";
import { useSettingsStore } from "../store/settings";
import { Section } from "./ui/Section";

export function AppearanceConfig() {
  const { collections } = useFigmaStore((state) => ({
    collections: state.collections,
  }));
  const { shouldHideSingleMode } = useSettingsStore();

  const hasMultipleModes = collections.some(
    (c) => c.modes?.length && c.modes.length >= 2
  );

  const options = generateOptions(hasMultipleModes);
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
    useSettingsStore.setState({ shouldHideSingleMode: newValue });
  }

  return (
    <Section title="Export mode" className="gap-2">
      <Dropdown
        onChange={handleCollectionChange}
        options={options}
        value={selected}
        variant="border"
      />
      <Checkbox onChange={handleGroupByModeChange} value={shouldHideSingleMode}>
        <Text>Hide single mode</Text>
      </Checkbox>
      {selected === "custom" && (
        <div class="appearance-list">
          {collections.find((c) => c.modes?.length && c.modes.length >= 2) &&
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
      )}
    </Section>
  );
}

const generateOptions = (hasMultipleModes?: boolean): DropdownOption[] => {
  if (hasMultipleModes)
    return [
      {
        value: "all",
        text: "All Modes in One File",
      },
      {
        value: "separate",
        text: "Each Mode in Separate Files",
      },
      "-",
      {
        value: "custom",
        text: "Choose Specific Mode",
      },
    ];

  return [
    {
      value: "all",
      text: "All Modes in One File",
    },
    {
      value: "separate",
      header: "Each Mode in Separate Files",
    },
    "-",
    {
      value: "custom",
      header: "Choose Specific Mode",
    },
  ];
};

import { h, JSX } from "preact";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useJsonPreviewString } from "../hooks/useJsonPreviewString";
import {
  Columns,
  Dropdown,
  IconButton,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { Clipboard } from "lucide-preact";
import { Section } from "./ui/Section";

export const Preview = () => {
  const jsonPreview = useJsonPreviewString();

  function handleClick(event: JSX.TargetedEvent<HTMLButtonElement>) {
    console.log(event);
  }
  return (
    <Section title="Preview" flex>
      <div class="code-panel">
        <div class="code-panel-header-wrapper">
          <div class="title">
            <Text style={{ color: "var(--figma-color-text-secondary)" }}>
              tokens.json
            </Text>
          </div>
          <Columns style={{ alignItems: "center", gap: 4 }} >
            <Dropdown
              variant="border"
              options={[
                { text: "JSON", value: "json" },
                // { text: "CSS", value: "css" },
              ]}
              value={"json"}
            />
            <button data-tooltip="Copy to clipboard" data-tooltip-type="text" class="icon-button" onClick={handleClick}>
              <Clipboard size={14} />
            </button>
          </Columns>
        </div>

        <div class="code-preview">
          <div>
            <SyntaxHighlighter
              useInlineStyles={false}
              showLineNumbers
              language="json"
              style={docco}
            >
              {JSON.stringify(jsonPreview, null, 2)}
            </SyntaxHighlighter>
            <style jsx>{`
              code.language-json {
                color: var(--figma-color-text);
                text-shadow: none;
              }
              .hljs-string {
                color: var(--figma-color-text-brand);
              }
              .hljs-number {
                color: var(--figma-color-text-danger);
              }
              .linenumber {
                color: var(--figma-color-text-disabled);
              }
            `}</style>
          </div>
        </div>
      </div>
      <VerticalSpace space="medium" />
    </Section>
  );
};

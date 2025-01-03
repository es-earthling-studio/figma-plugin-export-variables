import {
  Columns,
  Dropdown,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { Clipboard } from "lucide-preact";
import { h, JSX } from "preact";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useJsonPreviewString } from "../hooks/useJsonPreviewString";
import { copyTextToClipboard } from "../utils/copy-to-clipboard";
import { Section } from "./ui/Section";

export const Preview = () => {
  const jsonPreview = useJsonPreviewString();
  const jsonText = JSON.stringify(jsonPreview, null, 2);

  function handleCopyToClipboardClick(
    event: JSX.TargetedEvent<HTMLButtonElement>
  ) {
    copyTextToClipboard(jsonText);
    emit("COPY_TO_CLIPBOARD", "123123");
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
          <Columns style={{ alignItems: "center", gap: 4 }}>
            <Dropdown
              variant="border"
              options={[
                { text: "JSON", value: "json" },
                // { text: "CSS", value: "css" },
              ]}
              value={"json"}
            />
            <button
              data-tooltip="Copy to clipboard"
              data-tooltip-type="text"
              class="icon-button"
              onClick={handleCopyToClipboardClick}
            >
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
              {jsonText}
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

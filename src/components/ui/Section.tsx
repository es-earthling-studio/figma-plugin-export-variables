import { Bold, Divider, Text } from "@create-figma-plugin/ui";
import { h } from "preact";
import { PropsWithChildren } from "preact/compat";

type SectionProps = PropsWithChildren<{
  title: string;
  hasDivider?: boolean;
  flex?: boolean;
}>;

export const Section = (props: SectionProps) => {
  return (
    <div class="section" style={{ flexGrow: props.flex ? 1 : 0 }}>
      {props.hasDivider && <Divider />}
      <div class="section-title">
        <Text>
          <Bold>{props.title}</Bold>
        </Text>
      </div>
      <div class="section-body">{props.children}</div>
    </div>
  );
};

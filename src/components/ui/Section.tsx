import { Bold, Divider, Text } from "@create-figma-plugin/ui";
import { h } from "preact";
import { PropsWithChildren } from "preact/compat";

type SectionProps = PropsWithChildren<{
  title: string;
  hasDivider?: boolean;
  flex?: boolean;
  className?: React.HTMLAttributes<any>["className"];
}>;

export const Section = (props: SectionProps) => {
  const { className = "" } = props;
  return (
    <div class={`flex flex-col pb-4 ${props.flex ? "flex-grow" : ""}`}>
      {props.hasDivider && <Divider />}
      <div class="section-title">
        <Text>
          <Bold>{props.title}</Bold>
        </Text>
      </div>
      <div className={`section-body ${className}`}>{props.children}</div>
    </div>
  );
};

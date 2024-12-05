import * as React from "react";
import type {
  SelectRootProps,
  SelectValueChangeDetails,
} from "@ark-ui/react/select";
import { Check, ChevronDown } from "lucide-react";

import type { SelectVariantProps } from "styled-system/recipes";

import { Select, createListCollection } from "~/components/ui/select";

export type BaseBoard = (typeof items)[number]["value"];

const items = [
  { label: "Empty", value: "empty" },
  { label: "Random", value: "random" },
  { label: "Blinker", value: "blinker" },
  { label: "Glider", value: "glider" },
  { label: "Glider Gun", value: "gliderGun" },
  { label: "Toad", value: "toad" },
  { label: "Beacon", value: "beacon" },
  { label: "Pulsar", value: "pulsar" },
  { label: "Stripped", value: "stripped" },
  { label: "Checkered", value: "checkered" },
  { label: "📂 From a file", value: "file" },
] as const;

const collection = createListCollection({
  items,
});

export type BaseBoardSelectProps = SelectVariantProps &
  Omit<SelectRootProps<unknown>, "collection" | "onValueChange"> & {
    onValueChange?: (value: BaseBoard) => void;
  };

export const BaseBoardSelect = React.memo(function BaseBoardSelect(
  props: BaseBoardSelectProps,
) {
  const handleOnValueChange = (details: SelectValueChangeDetails) =>
    props.onValueChange?.(details.value[0] as BaseBoard);

  return (
    <Select.Root
      {...props}
      defaultValue={[items[0].value]}
      positioning={{ sameWidth: true }}
      collection={collection}
      size="sm"
      onValueChange={handleOnValueChange}
    >
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select a value" />
          <ChevronDown />
        </Select.Trigger>
      </Select.Control>

      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            {collection.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  );
});

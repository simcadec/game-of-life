import type { SelectRootProps } from "@ark-ui/react/select";
import { Check, ChevronDown } from "lucide-react";

import type { SelectVariantProps } from "styled-system/recipes";

import { Select, createListCollection } from "~/components/ui/select";

type Props = Omit<SelectRootProps<unknown>, "collection"> & SelectVariantProps;

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

export function BaseBoardSelect(props: Props) {
  return (
    <Select.Root
      defaultValue={[items[0].value]}
      positioning={{ sameWidth: true }}
      collection={collection}
      size="sm"
      {...props}
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
}

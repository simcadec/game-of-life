import * as React from "react";

import { css } from "styled-system/css";
import { HStack, Stack } from "styled-system/jsx";

import { type BaseBoard, BaseBoardSelect } from "~/components/BaseBoardSelect";
import { FileUpload } from "~/components/FileUpload";
import { Button } from "~/components/ui/button";
import { FormLabel } from "~/components/ui/form-label";
import { Input } from "~/components/ui/input";
import { useGame } from "~/contexts/Game";
import { mappingPatternMinSize } from "~/utils/patterns";

export function ResetForm() {
  const { boardSize, resetBoard } = useGame();

  const handleReset: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault(); // Do not post!

    // read form data
    const formData = new FormData(evt.currentTarget);

    // reset the board
    resetBoard({
      base: formData.get("base") as BaseBoard,
      size: Number(formData.get("size")),
      file: formData.get("file") as File,
    });
  };

  // Store the current base selectedBase
  const [selectedBase, setSelectedBase] = React.useState<BaseBoard>();

  // Board min size depends on the selected base
  const minSize =
    selectedBase && isKeyOfObject(selectedBase, mappingPatternMinSize)
      ? mappingPatternMinSize[selectedBase]
      : 3;

  return (
    <form onSubmit={handleReset} className={css({ mb: 6 })}>
      <HStack css={{ mb: 2 }}>
        <Stack gap="1" css={{ flexGrow: 1 }}>
          <FormLabel>Base</FormLabel>
          <BaseBoardSelect
            name="base"
            size={"sm"}
            onValueChange={(detail) =>
              setSelectedBase(detail.value[0] as BaseBoard)
            }
          />
        </Stack>

        <Stack gap="1">
          <FormLabel>Size</FormLabel>
          <Input
            type="number"
            name="size"
            size={"sm"}
            defaultValue={boardSize}
            min={minSize}
            max={1000}
            disabled={selectedBase === "file"}
          />
        </Stack>

        <Stack gap="1">
          <FormLabel>&nbsp;</FormLabel>
          <Button size={"sm"} type="submit">
            Apply
          </Button>
        </Stack>
      </HStack>

      {selectedBase === "file" ? (
        <FileUpload name="file" accept=".json" />
      ) : null}
    </form>
  );
}

// TODO: move to some TS utils, or better use sindresorhus/ts-extra
function isKeyOfObject<T extends object>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj;
}

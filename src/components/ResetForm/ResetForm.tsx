import * as React from "react";

import { css } from "styled-system/css";
import { HStack, Stack } from "styled-system/jsx";

import { type BaseBoard, BaseBoardSelect } from "~/components/BaseBoardSelect";
import { FileUpload } from "~/components/FileUpload";
import { Button } from "~/components/ui/button";
import { FormLabel } from "~/components/ui/form-label";
import { Input } from "~/components/ui/input";
import { useGame } from "~/contexts/Game";

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
            min={3}
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

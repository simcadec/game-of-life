import { Pause, Play } from "lucide-react";

import { css } from "styled-system/css";
import { HStack, Stack } from "styled-system/jsx";

import { Export } from "~/components/Export";
import { NextButton } from "~/components/NextButton";
import { ResetForm } from "~/components/ResetForm";
import { SliderSpeed } from "~/components/SliderSpeed";
import { TimeTravel } from "~/components/TimeTravel";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { useBoard, useGame } from "~/contexts/Game";

function Generation() {
  const { generationCount } = useBoard();

  return <b>Generation n° {generationCount ?? 0}</b>;
}

export function Sidebar() {
  const { isRunning, setSpeed, speed, toggle } = useGame();

  return (
    <Stack css={{ bg: "bg.default", p: 3, justifyContent: "space-between" }}>
      <div>
        <Heading as="h1" size="2xl" css={{ mb: 4 }}>
          Game of Life
        </Heading>

        <Heading as="h2" size={"md"} css={{ mb: 2 }}>
          Create a new board
        </Heading>

        <ResetForm />

        <Heading as="h2" size={"md"} css={{ mb: 2 }}>
          Controls
        </Heading>

        <SliderSpeed speed={speed} onValueChangeEnd={setSpeed} />

        <HStack>
          <Button onClick={toggle} className={css({ flex: 1 })}>
            {isRunning ? (
              <>
                <Pause /> Pause
              </>
            ) : (
              <>
                <Play /> Start
              </>
            )}
          </Button>

          <NextButton />
        </HStack>
      </div>

      <Stack>
        <TimeTravel />
        <Generation />
        <Export disabled={isRunning} />
      </Stack>
    </Stack>
  );
}

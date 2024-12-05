import * as React from "react";

import { Pause, Play, RedoDot } from "lucide-react";

import { css } from "styled-system/css";
import { HStack, Stack } from "styled-system/jsx";

import { Export } from "~/components/Export";
import { ResetForm } from "~/components/ResetForm";
import { Button } from "~/components/ui/button";
import { Heading } from "~/components/ui/heading";
import { Slider } from "~/components/ui/slider";
import { useGame } from "~/contexts/Game";
import { TimeTravel } from "../TimeTravel";

export function Sidebar() {
  const { generationCount, goNext, isStopped, setSpeed, speed, toggle } =
    useGame();

  // Store live values to keep the UI in sync
  const [formSpeed, setFormSpeed] = React.useState(speed);

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

        <Slider
          defaultValue={[speed]}
          min={10}
          max={2000}
          onValueChangeEnd={(details) => {
            setSpeed(details.value[0]);
          }}
          onValueChange={(details) => {
            setFormSpeed(details.value[0]);
          }}
          step={10}
          marks={[
            { value: 10, label: "0.01s" },
            { value: 500, label: "0.5s" },
            { value: 1000, label: "1s" },
            { value: 2000, label: "2s" },
          ]}
          css={{ mb: 12, colorPalette: formSpeed <= 200 ? "red" : undefined }}
        >
          Speed {formSpeed}ms - {Number(1000 / formSpeed).toFixed(2)} FPS
        </Slider>

        <HStack>
          <Button onClick={toggle} className={css({ flex: 1 })}>
            {isStopped ? (
              <>
                <Play /> Start
              </>
            ) : (
              <>
                <Pause /> Pause
              </>
            )}
          </Button>

          <Button
            onClick={goNext}
            disabled={!isStopped}
            className={css({ flex: 1 })}
          >
            <RedoDot /> Next
          </Button>
        </HStack>
      </div>

      <Stack>
        <TimeTravel />
        <b>Generation n° {generationCount ?? 0}</b>
        <Export disabled={!isStopped} />
      </Stack>
    </Stack>
  );
}

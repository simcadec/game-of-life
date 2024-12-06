import * as React from "react";

import { Slider } from "~/components/ui/slider";
import { useBoard, useGame } from "~/contexts/Game";

export function TimeTravel() {
  const { isRunning, goTo } = useGame();
  const { generationCount } = useBoard();

  // Used to temporally store the current generation count
  const [generationInternal, setGenerationInternal] = React.useState(
    generationCount ?? 0,
  );

  React.useEffect(() => {
    if (generationCount == null || isRunning) {
      // Reset if at the initial board state, or running
      setGenerationInternal(0);
    } else if (generationCount > generationInternal) {
      // Update to the latest generation if it go beyond the current one
      setGenerationInternal(generationCount ?? 0);
    }
  }, [generationCount, generationInternal, isRunning]);

  // Display TimeTravel only when the game is stopped and board has at least one generation
  if (isRunning || generationCount == null) {
    return null;
  }

  const max = Math.max(generationInternal, generationCount ?? 0);

  return (
    <Slider
      value={[generationCount ?? 0]}
      min={0}
      max={max}
      marks={[
        { value: 0, label: "0" },
        { value: max, label: max },
      ]}
      onValueChange={(details) => {
        goTo(details.value[0]);
      }}
      css={{ mb: 6 }}
    >
      Time travel
    </Slider>
  );
}

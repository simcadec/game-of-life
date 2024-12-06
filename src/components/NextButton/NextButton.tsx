import { RedoDot } from "lucide-react";
import { css } from "styled-system/css";

import { Button } from "~/components/ui/button";
import { useBoard, useGame } from "~/contexts/Game";

export function NextButton() {
  const { goNext } = useBoard();
  const { isRunning } = useGame();

  return (
    <Button onClick={goNext} disabled={isRunning} className={css({ flex: 1 })}>
      <RedoDot /> Next
    </Button>
  );
}

import * as React from "react";
import { useInterval } from "react-timing-hooks";

export function useTimeControl(callback: () => void) {
  const [speed, setSpeed] = React.useState(250);
  const { start, stop, isStopped } = useInterval(callback, speed, {
    isLeading: true,
  });

  const toggle = React.useCallback(() => {
    if (isStopped) {
      start();
    } else {
      stop();
    }
  }, [isStopped, start, stop]);

  return { isStopped, toggle, stop, speed, setSpeed };
}

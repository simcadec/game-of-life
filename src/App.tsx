import * as React from "react";

import { GameProvider } from "./contexts/Game";

import { Grid } from "styled-system/jsx";

import { Canvas } from "~/components/Canvas";
import { Sidebar } from "~/components/Sidebar";

function Game() {
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  // Extract the dimensions of the canvas container
  React.useLayoutEffect(() => {
    if (canvasContainerRef.current) {
      setDimensions({
        width: canvasContainerRef.current.offsetWidth,
        height: canvasContainerRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <Grid css={{ gridTemplateColumns: "350px 1fr", h: "100vh" }} gap={0}>
      <Sidebar />
      <div ref={canvasContainerRef}>
        {dimensions ? <Canvas dimensions={dimensions} /> : null}
      </div>
    </Grid>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

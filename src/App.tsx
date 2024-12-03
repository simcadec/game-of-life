import { GameProvider } from "./contexts/Game";

import { Grid } from "styled-system/jsx";

import { Canvas } from "~/components/Canvas";
import { Sidebar } from "~/components/Sidebar";
import { SizeAwareComponent } from "~/components/SizeAwareComponent";

function Game() {
  return (
    <Grid css={{ gridTemplateColumns: "350px 1fr", h: "100vh", gap: 0 }}>
      <Sidebar />
      <SizeAwareComponent>
        {(dimensions) => <Canvas dimensions={dimensions} />}
      </SizeAwareComponent>
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

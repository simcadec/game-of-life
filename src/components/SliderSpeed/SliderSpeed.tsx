import * as React from "react";

import { Slider } from "~/components/ui/slider";

function SliderSpeedComp({ speed, onValueChangeEnd }: SliderSpeedProps) {
  const [formSpeed, setFormSpeed] = React.useState(speed);

  return (
    <Slider
      defaultValue={[speed]}
      min={10}
      max={2000}
      onValueChangeEnd={(details) => {
        onValueChangeEnd(details.value[0]);
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
  );
}

export const SliderSpeed = React.memo(SliderSpeedComp);

type SliderSpeedProps = {
  speed: number;
  onValueChangeEnd: (speed: number) => void;
};

import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";

// @ts-expect-error ts config with wildcard package exports?
import sage from "@park-ui/panda-preset/colors/sage";
// @ts-expect-error ts config with wildcard package exports?
import teal from "@park-ui/panda-preset/colors/teal";

export default defineConfig({
  preflight: true, // Whether to use css reset

  presets: [createPreset({ accentColor: teal, grayColor: sage, radius: "sm" })],

  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],
  exclude: [],

  jsxFramework: "react",
  // jsxStyleProps: 'minimal', I like to enable this in development

  outdir: "styled-system", // The output directory for your css system
});

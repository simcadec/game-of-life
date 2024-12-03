import * as React from "react";

type CounterAction = { type: "INCREMENT" } | { type: "RESET"; payload: number };

const initialState = 0;

const counterReducer = (state: number, action: CounterAction): number => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "RESET":
      return action.payload;
    default:
      return state;
  }
};

export function useGenerationCounter() {
  const [generationCount, dispatch] = React.useReducer(
    counterReducer,
    initialState,
  );

  const generationIncrement = React.useCallback(() => {
    dispatch({ type: "INCREMENT" });
  }, []);

  const generationReset = React.useCallback((value = 0) => {
    dispatch({ type: "RESET", payload: value });
  }, []);

  return { generationIncrement, generationReset, generationCount };
}

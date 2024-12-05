import * as React from "react";

type CounterAction =
  | { type: "INCREMENT" }
  | { type: "RESET"; payload: CounterState };

// null is a special value that represents the initial Board generation, when no generation has been done yet
// Useful to distinguish a board with no generation from a board time traveled to generation 0
type CounterState = number | null;

const reducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return state ? state + 1 : 1;
    case "RESET":
      return action.payload;
    default:
      return state;
  }
};

export function useGenerationCounter() {
  const [generationCount, dispatch] = React.useReducer(reducer, null);

  const generationIncrement = React.useCallback(() => {
    dispatch({ type: "INCREMENT" });
  }, []);

  const generationReset = React.useCallback((value: CounterState = null) => {
    dispatch({ type: "RESET", payload: value });
  }, []);

  return { generationIncrement, generationReset, generationCount };
}

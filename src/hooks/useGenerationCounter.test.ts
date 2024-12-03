import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useGenerationCounter } from "./useGenerationCounter";

describe("useGenerationCounter", () => {
  it("should initialize with a count of 0", () => {
    const { result } = renderHook(() => useGenerationCounter());
    expect(result.current.generationCount).toBe(0);
  });

  it("should increment the count by 1 when generationIncrement is called", () => {
    const { result } = renderHook(() => useGenerationCounter());
    act(() => {
      result.current.generationIncrement();
    });
    expect(result.current.generationCount).toBe(1);
  });

  it("should reset the count to 0 by default when generationReset is called without arguments", () => {
    const { result } = renderHook(() => useGenerationCounter());
    act(() => {
      result.current.generationReset();
    });
    expect(result.current.generationCount).toBe(0);
  });

  it("should reset the count to a specified value when generationReset is called", () => {
    const { result } = renderHook(() => useGenerationCounter());
    act(() => {
      result.current.generationReset(5);
    });
    expect(result.current.generationCount).toBe(5);
  });

  it("should increment the count multiple times", () => {
    const { result } = renderHook(() => useGenerationCounter());
    act(() => {
      result.current.generationIncrement();
      result.current.generationIncrement();
      result.current.generationIncrement();
    });
    expect(result.current.generationCount).toBe(3);
  });

  it("should reset and then increment the count", () => {
    const { result } = renderHook(() => useGenerationCounter());
    act(() => {
      result.current.generationReset(10);
      result.current.generationIncrement();
    });
    expect(result.current.generationCount).toBe(11);
  });
});

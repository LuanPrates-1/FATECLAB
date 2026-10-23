import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

// O jsdom não implementa ResizeObserver nem matchMedia.
class ResizeObserverFalso {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver ??= ResizeObserverFalso;
if (!window.matchMedia) {
  window.matchMedia = (consulta: string) =>
    ({ matches: false, media: consulta, addEventListener() {}, removeEventListener() {} }) as unknown as MediaQueryList;
}

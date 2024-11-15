import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { initReactI18next } from "react-i18next";
import { afterEach, expect } from "vitest";

import i18n from "@/i18n";

import { server } from "./mocks/server";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {},
});

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

Element.prototype.scrollIntoView = vi.fn();

vi.mock("@/path/to/Notification", () => ({
  __esModule: true,
  ...require("@/__mocks__/NotificationMock"),
}));

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

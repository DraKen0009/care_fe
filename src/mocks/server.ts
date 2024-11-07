import { setupServer } from "msw/node";
import { assetHandlers } from "./handlers";

export const server = setupServer(...assetHandlers);

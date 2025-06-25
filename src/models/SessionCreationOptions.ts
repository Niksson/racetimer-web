import type { Side } from "./Side";

export type SessionCreationOptions = {
  name?: string;
  playerNames?: Record<Side, string | undefined>;
  selectedEvents?: Record<Side, string>;
}
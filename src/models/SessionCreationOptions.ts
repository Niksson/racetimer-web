import type { SideMap } from "./Side";

export type SessionCreationOptions = {
  name?: string;
  playerNames?: SideMap<string | undefined>;
  selectedEvents?: SideMap<string>;
}
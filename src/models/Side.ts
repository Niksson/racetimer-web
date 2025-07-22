// player1 side is always the player on the bottom of the screen (normally owner of the device)
// player2 side is always the player on the top of the screen (the opponent)
export type Side = 'player1' | 'player2'

export type SideMap<T> = Record<Side, T>
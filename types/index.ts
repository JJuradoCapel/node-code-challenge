export type Position = { x: number, y: number };
export enum Direction {
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W',
}

export const directionInvertedMap = {
  N: Direction.N,
  E: Direction.E,
  S: Direction.S,
  W: Direction.W,
};

export enum Actions {
  L = 'L',
  R = 'R',
  F = 'F',
}

export const actionsInvertedMap = {
  L: Actions.L,
  R: Actions.R,
  F: Actions.F,
};

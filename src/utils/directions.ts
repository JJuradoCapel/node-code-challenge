import { Direction } from '../../types';

export const checkCoordinates = (coords: { x: number; y: number }, limits: { x: number; y: number }) => (
  coords.x <= limits.x
  && coords.x >= 0
  && coords.y <= limits.y
  && coords.y >= 0
);

export const directionArray = [Direction.N, Direction.W, Direction.S, Direction.E];
const directionLength = directionArray.length;
export const applyCircularTurn = (initialDirection: Direction, val: number): Direction => {
  // Utils function to get the next direction value using a turn descriptor. The rules are the following,
  //   - Negative values means clockwise turns and positive anti-clockwise turns
  //   - The value itself means how many positions turns. Because we are using only the 4 cardinal directions, each unit
  //     is a 90 degrees turn.
  // Examples,
  // Initial direction: N, Turn value: -1, Final direction: E
  // Initial direction: S, Turn value: 2, Final direction: N
  // Initial direction: N, Turn value: -4, Final direction: N
  const initialIndex = directionArray.findIndex((direction) => direction === initialDirection);
  const nextIndex = initialIndex + val;

  // If the result is inside the array, we simple return the value
  if (nextIndex >= 0 && nextIndex < directionLength) return directionArray[nextIndex];

  // If the result is negative, we should continue by the end of the array
  if (nextIndex < 0) return applyCircularTurn(directionArray[directionLength - 1], nextIndex + 1);

  // If the result is bigger than the array length, we should continue by the start of the array
  return applyCircularTurn(directionArray[0], nextIndex - directionLength);
};

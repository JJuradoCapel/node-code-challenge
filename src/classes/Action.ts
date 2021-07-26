import { Direction, Position } from '../../types';

type GetNextDirectionT = (currentDirection: Direction, currentPosition: Position) => Direction;
type GetNextPositionT = (currentPosition: Position, currentDirection: Direction) => Position;

class Action {
  // Class to describe an action or instruction that a robot could receive.
  // Store the function that computes the next direction/position
  public getNextDirection: GetNextDirectionT;

  public getNextPosition: GetNextPositionT;

  constructor(getNextDirection: GetNextDirectionT, getNextPosition: GetNextPositionT) {
    this.getNextDirection = getNextDirection;
    this.getNextPosition = getNextPosition;
  }
}

export default Action;

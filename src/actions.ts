import Action from './classes/Action';
import { Actions, Direction, Position } from '../types';
import { applyCircularTurn } from './utils';

const getNextDirectionLeftAction = (currentDirection: Direction) => applyCircularTurn(currentDirection, 1);
const getNextPositionLeftAction = (currentPosition : Position) => currentPosition;
const leftAction = new Action(getNextDirectionLeftAction, getNextPositionLeftAction);

const getNextDirectionRightAction = (currentDirection: Direction) => applyCircularTurn(currentDirection, -1);
const getNextPositionRightAction = (currentPosition : Position) => currentPosition;
const rightAction = new Action(getNextDirectionRightAction, getNextPositionRightAction);

const getNextDirectionForwardAction = (currentDirection: Direction) => currentDirection;
const getNextPositionForwardAction = (currentPosition : Position, currentDirection: Direction) => {
  switch (currentDirection) {
    case Direction.N:
      return { x: currentPosition.x, y: currentPosition.y + 1 };
    case Direction.E:
      return { x: currentPosition.x + 1, y: currentPosition.y };
    case Direction.S:
      return { x: currentPosition.x, y: currentPosition.y - 1 };
    case Direction.W:
      return { x: currentPosition.x - 1, y: currentPosition.y };
    default:
      throw new Error('Wrong direction');
  }
};
const forwardsAction = new Action(getNextDirectionForwardAction, getNextPositionForwardAction);

export default {
  [Actions.F]: forwardsAction,
  [Actions.L]: leftAction,
  [Actions.R]: rightAction,
};

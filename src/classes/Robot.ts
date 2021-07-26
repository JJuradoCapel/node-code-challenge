import { Direction, Position } from '../../types';
import Action from './Action';

class Robot<T extends string> {
  public position: Position;

  public direction: Direction;

  public actions: Record<T, Action>;

  public isLost: boolean;

  constructor(initialPosition: Position, initialDirection: Direction, actions: Record<T, Action>) {
    // Class that describes a Robot entity
    this.position = initialPosition;
    this.direction = initialDirection;
    this.actions = actions;
    this.isLost = false;
  }

  public step(actionKey: T) {
    if (!(actionKey in this.actions)) throw new Error('Invalid action');
    this.position = this.actions[actionKey].getNextPosition(this.position, this.direction);
    this.direction = this.actions[actionKey].getNextDirection(this.direction, this.position);
  }
}

export default Robot;

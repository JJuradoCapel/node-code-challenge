import Robot from './Robot';
import { Position } from '../../types';

const isOutsideTheMap = (robotPosition: Position, mapDimensions: { x: number, y: number }) => robotPosition.x < 0
    || robotPosition.x > mapDimensions.x
    || robotPosition.y < 0
    || robotPosition.y > mapDimensions.y;

class Map<T extends string> {
  public dimensions: { x: number, y: number };

  // We store the lost signals form the robots as a hash map, in the form of number to array of number.
  //    - The first value (the key of the map) is the X coords
  //    - The array is the list of the Y coords where a robot has been lost previously
  public lostSignals: Record<number, number[]>;

  constructor(dimension: { x: number, y: number }) {
    this.dimensions = dimension;
    this.lostSignals = {};
  }

  public simulate(robot: Robot<T>, actions: T[]) {
    for (const action of actions) {
      // Copy the original coordinates
      const initialPosition = { x: robot.position.x, y: robot.position.y };
      robot.step(action);
      const newPosition = robot.position;
      if (isOutsideTheMap(newPosition, this.dimensions)) {
        // Look for the last valid position in the lost signal object.
        if (initialPosition.x in this.lostSignals) {
          const yValues = this.lostSignals[initialPosition.x];
          if (yValues.includes(initialPosition.y)) {
            // If there is a "scent" ignore the last action
            robot.position = initialPosition;
          } else {
            // The robot is lost. Add the last valid coords to the object of lost signals and stop processing actions
            yValues.push(initialPosition.y);

            // Restore the last valid position
            robot.position = initialPosition;
            robot.isLost = true;
            break;
          }
        } else {
          // The robot is lost. Add the last valid coords to the object of lost signals and stop processing actions
          this.lostSignals[initialPosition.x] = [initialPosition.y];

          // Restore the last valid position
          robot.position = initialPosition;
          robot.isLost = true;
          break;
        }
      }
    }
  }
}

export default Map;

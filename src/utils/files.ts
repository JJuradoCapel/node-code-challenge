import * as fs from 'fs';
import * as readline from 'readline';
import { writeFile } from 'fs/promises';
import * as os from 'os';

import Robot from '../classes/Robot';
import Map from '../classes/Map';
import defaultActions from './actions';
import { Actions, actionsInvertedMap, directionInvertedMap } from '../../types';
import { checkCoordinates } from './directions';
import { MAX_INSTRUCTIONS } from '../constants';

const ParseError = (line: number, msg: string) => new Error(`Parse error in line ${line}: ${msg}`);

export const parseMapDimensions = (line: string) => {
  const values = line.split(' ');
  if (values.length !== 2) throw ParseError(0, 'Wrong map dimensions definition');

  const mapDimensions = { x: parseInt(values[0], 10), y: parseInt(values[1], 10) };
  if (!checkCoordinates(mapDimensions)) throw ParseError(0, 'Invalid dimensions. Should be between 0 and 50');
  return mapDimensions;
};

export const parseRobot = (line: string, lineNumber: number) => {
  const values = line.split(' ');
  if (values.length !== 3) throw ParseError(lineNumber, 'Wrong robot definition');

  const initialDirection = values[2];
  if (!(initialDirection in directionInvertedMap)) throw ParseError(lineNumber, 'Wrong robot definition. Invalid direction');
  const initialDirectionParsed = directionInvertedMap[initialDirection as keyof typeof directionInvertedMap];

  const initialPosition = { x: parseInt(values[0], 10), y: parseInt(values[1], 10) };
  if (!checkCoordinates(initialPosition)) throw ParseError(lineNumber, 'Invalid initial position. Should be between 0 and 50');
  return new Robot(initialPosition, initialDirectionParsed, defaultActions);
};

export const parseActions = (line: string, lineNumber: number) => {
  if (line.length > MAX_INSTRUCTIONS) throw ParseError(lineNumber, 'Wrong actions definition. Maximum number of instructions reached');

  return line.split('').map((action) => {
    if (!(action in actionsInvertedMap)) throw ParseError(lineNumber, 'Wrong action definition. Unknown action');
    return actionsInvertedMap[action as keyof typeof actionsInvertedMap];
  });
};

export const parseFile = async (filename: string): Promise<[Map<Actions>, Robot<Actions>[], Actions[][]]> => {
  const dataStream = fs.createReadStream(filename);
  let lineNumber = 0;
  const robots: Robot<Actions>[] = [];
  const actionsList: Actions[][] = [];
  let mapDimensions: { x: number, y: number };

  const readInterface = readline.createInterface({
    input: dataStream,
    crlfDelay: Infinity,
  });

  for await (const line of readInterface) {
    if (lineNumber === 0) {
      mapDimensions = parseMapDimensions(line);
    } else if (lineNumber % 2 !== 0) {
      // If the line number is odd, we are at a robot initial definition
      robots.push(parseRobot(line, lineNumber));
    } else {
      // If the line number is even, we are at a robot actions definition
      actionsList.push(parseActions(line, lineNumber));
    }
    lineNumber += 1;
  }

  return [new Map(mapDimensions), robots, actionsList];
};

export const writeResult = (robots: Robot<Actions>[], filename: string) => {
  let file = '';
  robots.forEach((robot) => {
    file = file.concat(`${robot.position.x} ${robot.position.y} ${robot.direction}`);
    file = file.concat(robot.isLost ? ` LOST${os.EOL}` : os.EOL);
  });

  return writeFile(filename, file);
};

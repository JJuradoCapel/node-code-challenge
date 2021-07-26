import parseArgs from 'minimist';
import chalk from 'chalk';

import { parseFile, writeResult } from './utils/files';

// Remove the exec path and the script location and parse the arguments
const args = parseArgs(process.argv.slice(2));
(async () => {
  try {
    const [map, robots, actions] = await parseFile(String(args._[0]));
    robots.forEach((robot, index) => map.simulate(robot, actions[index]));
    await writeResult(robots, String(args._[1]));
  } catch (e) {
    console.log(chalk.red(e.message));
  }
})();

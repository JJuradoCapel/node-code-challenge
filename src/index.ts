import parseArgs from 'minimist';

import { parseFile, writeResult } from './utils/files';

// Remove the exec path and the script location and parse the arguments
const args = parseArgs(process.argv.slice(2));
(async () => {
  const [map, robots, actions] = await parseFile(args._[0]);
  robots.forEach((robot, index) => map.simulate(robot, actions[index]));
  await writeResult(robots, args._[1]);
})();

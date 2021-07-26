# Robots in Mars
## Introduction
Welcome to Mars, the Red Planet, well, at least to a simulated version of the planet inhabited by a swarm of robots.

Mars is a strange planet, it is flat, so the robots can fall off the edge of the world. Don't worry though, we have developed a perfect solution for that. In case of accidental loss of a unit, it will leave a signal at the last valid position to warn other robots of the danger.

Here, you will find the core navigation system for the robots in this strange planet.

## How to use it
The basic syntax for the CLI, is the follow,
```
node-code-challenge <input-file> <output-file>
```

Check the next section to learn about the input and output syntax.

There a two different ways to get into the CLI,

* **Using the compiled version (recommended):** Download the compiled executable for your platform from the release section in GitHub and use it directly from the console.
* **Using node:** Require node. 
  * Clone the repo
  * Install the dependencies with `yarn install` or `npm i`
  * Use the CLI with `yarn start <input-file> <output-file>` or `npm start <input-file> <output-file>`
    
## Input and output syntax

The first line of input is the upper-right coordinates of the rectangular world, the
lower-left coordinates are assumed to be 0, 0.

The remaining input consists of a sequence of robot positions and instructions (two lines
per robot). A position consists of two integers specifying the initial coordinates of the
robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot
instruction is a string of the letters L, R, and F on one line.
Each robot is processed sequentially, i.e., finishes executing the robot instructions
before the next robot begins execution.
The maximum value for any coordinate is 50.
All instruction strings will be less than 100 characters in length.

For each robot position/instruction in the input, the output indicate the final grid
position and orientation of the robot. If a robot falls off the edge of the grid the word
LOST should be printed after the position and orientation.

### Sample input
```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL
```
### Sample output
```
1 1 E
3 3 N LOST
2 3 S
```

In the `example` folder you could find some input files examples.

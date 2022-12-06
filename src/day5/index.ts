import { SolutionBase } from "../util/SolutionBase.js"

type Stack = string[]
type Stacks = Record<string, Stack>

export class Solution extends SolutionBase {
  async solve() {
    const input = await this.readInput()
    const [stacksString, instructionsString] = input.split('\n\n')

    // Parse stacks into array
    const [stackAmount] = stacksString.match(/\d+\s*$/gm)!
    const stacksStringArray = stacksString.split('\n').slice(0, -1)

    const stacks: Stacks = {}
    for (let n = 1; n <= ~~stackAmount; n++) {
      const stackName = `stack${n}`;
      const cratePosition = 1 + (4 * (n-1));
      stacksStringArray.slice().reverse().forEach((line, i) => {
        if (i === 0) {
          stacks[stackName] = []
        }
        const crateItem = line[cratePosition];
        if (crateItem === ' ') {
          return
        }
        stacks[stackName].push(crateItem)
      })
    }
    console.log(stacks)
    // Parse instructions to array of objects using Regex
  }
}
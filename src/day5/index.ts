import { SolutionBase } from "../util/SolutionBase.js"

type Stack = string[]
type Stacks = Record<string, Stack>

interface Instruction {
  amount: number
  from: string
  to: string
}

export class Solution extends SolutionBase {
  async solve() {
    const input = await this.readInput()
    const [stacksString, instructionsString] = input.split("\n\n")

    // Parse stacks into array
    const [stackAmount] = stacksString.match(/\d+\s*$/gm)!
    const stacksStringArray = stacksString.split("\n").slice(0, -1)

    const stacks: Stacks = {}
    for (let n = 1; n <= ~~stackAmount; n++) {
      const stackName = `stack${n}`
      const cratePosition = 1 + 4 * (n - 1)
      stacksStringArray
        .slice()
        .reverse()
        .forEach((line, i) => {
          if (i === 0) {
            stacks[stackName] = []
          }
          const crateItem = line[cratePosition]
          if (crateItem === " ") {
            return
          }
          stacks[stackName].push(crateItem)
        })
    }

    // Parse instructions to array of objects using Regex
    const instructions: Instruction[] = instructionsString
      .trim()
      .split("\n")
      .map((line) => {
        const [, amount, from, to] = line.match(
          /^move (\d+) from (\d+) to (\d+)$/
        )!
        return { amount: Number.parseInt(amount), from, to }
      })

    // Perform instructions
    for (let instruction of instructions) {
      const { amount, from, to } = instruction
      for (let i = 0; i < amount; i++) {
        stacks[`stack${to}`].push(
          stacks[`stack${from}`].pop() || "Erroneous Crate"
        )
      }
    }

    let part1Solution = ""
    for (let [,stack] of Object.entries(stacks)) {
      part1Solution += stack[stack.length - 1]
    }
    console.log(part1Solution)
  }
}

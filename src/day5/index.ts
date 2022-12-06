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
    await this.part1()
    await this.part2()
  }

  async part1() {
    const stacks = await this.executeInstructions(false)
    this.printSolutionKey(stacks)
  }

  async part2() {
    const stacks = await this.executeInstructions(true)
    this.printSolutionKey(stacks)
  }

  async executeInstructions(moveInBulk: boolean): Promise<Stacks> {
    const [stacks, instructions] = await this.getParsedInput();
    for (let instruction of instructions) {
      const { amount, from, to } = instruction
      const tempStack: Stack = []
      for (let i = 0; i < amount; i++) {
        tempStack.push(stacks[`stack${from}`].pop() || "Erroneous Crate")
      }
      stacks[`stack${to}`].push(...(moveInBulk ? tempStack.reverse() : tempStack))
    }
    return stacks;
  }

  printSolutionKey(stacks: Stacks) {
    let solutionKey = ""
    for (let stack of Object.values(stacks)) {
      solutionKey += stack[stack.length - 1]
    }
    console.log(solutionKey)
  }

  async getParsedInput(): Promise<[Stacks, Instruction[]]> {
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

    return [stacks, instructions]
  }
}

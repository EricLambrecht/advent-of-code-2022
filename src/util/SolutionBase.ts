import fs from "fs/promises"
import colors from "colors/safe.js"

export class SolutionBase {
  public solutionDirectory: string

  constructor(directory: string) {
    this.solutionDirectory = directory
  }

  async readInput(fileName = "input.txt") {
    return fs.readFile(this.solutionDirectory + "/" + fileName, {
      encoding: "utf8",
    })
  }

  async readInputLines(fileName = "input.txt") {
    const input = await this.readInput()
    return input.trim().split("\n")
  }

  outputPart1(solution: any) {
    this.printSolution(solution, "Part 1:")
  }

  outputPart2(solution: any) {
    this.printSolution(solution, "Part 2:")
  }

  printSolution(text: any, prefix: string) {
    const callArgs = [prefix, text].filter((arg) => arg)
    console.log(...callArgs)
  }

  async solve() {
    console.warn("Implement solve() to see your output!")
  }
}

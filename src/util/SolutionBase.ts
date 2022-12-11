import fs from "fs/promises"

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
    const input = await this.readInput(fileName)
    return input.trim().split(/\r?\n/)
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

  async sleep(ms = 100) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async solve() {
    console.warn("Implement solve() to see your output!")
  }
}

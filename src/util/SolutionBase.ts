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
    const input = await this.readInput()
    return input.trim().split("\n")
  }

  async solve() {
    console.warn("Implement solve() to see your output!")
  }
}

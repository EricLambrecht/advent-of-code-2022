import fs from "fs/promises"

export class SolutionBase {
  public solutionDirectory: string

  constructor(directory: string) {
    this.solutionDirectory = directory
  }

  readInput(fileName = "input.txt") {
    return fs.readFile(this.solutionDirectory + "/" + fileName, {
      encoding: "utf8",
    })
  }

  async solve() {
    console.warn("Implement solve() to see your output!")
  }
}

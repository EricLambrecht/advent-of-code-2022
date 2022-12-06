import { SolutionBase } from "../util/SolutionBase.js"

export class Solution extends SolutionBase {
  async solve() {
    const input = await this.readInput()
    const [stacksString, instructionsString] = input.split('\n\n');
  }
}
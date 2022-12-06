import { SolutionBase } from "../util/SolutionBase.js"

export class Solution extends SolutionBase {
  /*
   * I revisited this on day 6 to remove unnecessary stuff that was not used,
   * like "elf names" and collecting data that was not even printed. :D
   *
   * Back at Day 1 I wasn't sure how this challenge works, and now I think
   * this fluff distracts from actual the solution logic (which I didn't touch).
   */
  async solve() {
    const input = await this.readInput()

    const calorieHighscores = input
      .split("\n\n")
      .map((rawCalories, i) => {
        const calories = rawCalories.split("\n").map((c) => Number.parseInt(c))
        return calories.reduce((sum, calories) => sum + calories, 0)
      })
      .sort((a, b) => b - a)

    const topScore = calorieHighscores[0]
    this.outputPart1(topScore)

    const topThree = calorieHighscores.slice(0, 3)
    const topThreeScore = topThree.reduce((sum, calories) => sum + calories, 0)
    this.outputPart2(topThreeScore)
  }
}

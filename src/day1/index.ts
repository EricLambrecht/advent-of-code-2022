import { SolutionBase } from "../util/SolutionBase.js"

interface Elf {
  name: string
  calories: number[]
  caloriesTotal: number
}

export class Solution extends SolutionBase {
  async solve() {
    const input = await this.readInput()

    const elves = input
      .split("\n\n")
      .map((rawCalories, i) => {
        const calories = rawCalories.split("\n").map((c) => Number.parseInt(c))
        const caloriesTotal = calories.reduce(
          (sum, calories) => sum + calories,
          0
        )
        return {
          name: `${i + 1}. Elf`,
          caloriesTotal,
          calories,
        } as Elf
      })
      .sort((a, b) => b.caloriesTotal - a.caloriesTotal)

    const topElf = elves[0]
    console.log(
      `1. The elf with the most calories is ${topElf.name} carrying this much calories:`
    )
    console.log(topElf.caloriesTotal)

    const topThree = elves.slice(0, 3)
    const totalCaloriesTopThree = topThree.reduce(
      (sum, elf) => sum + elf.caloriesTotal,
      0
    )

    console.log("2. The top three elves carry this much calories in total:")
    console.log(totalCaloriesTopThree)
  }
}

import { SolutionBase } from "../util/SolutionBase.js"

export class Solution extends SolutionBase {
  async solve() {
    const pairsRaw = await this.readInputLines()
    const obsoletePairs = pairsRaw.filter((pair) => {
      const matches = pair.match(/(\d+)-(\d+),(\d+)-(\d+)/)! // we can be sure that there are matches since we know the input
      const [, aMin, aMax, bMin, bMax] = matches
      // The two-bitwise-operator (~~) converts the string to an integer
      return (~~aMin >= ~~bMin && ~~aMax <= ~~bMax) || (~~aMin <= ~~bMin && ~~aMax >= ~~bMax)
    })
    console.log(obsoletePairs.length)
  }
}

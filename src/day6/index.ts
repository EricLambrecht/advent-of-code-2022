import { SolutionBase } from "../util/SolutionBase.js"

export class Solution extends SolutionBase {
  async solve() {
    const input = await this.readInput()

    const startOfPacketMarker = this.detectStartMarker(input, 4)
    const startOfMessageMarker = this.detectStartMarker(input, 14)

    console.table({ startOfPacketMarker, startOfMessageMarker })
  }

  detectStartMarker(input: string, markerLength: number) {
    const startIndex = markerLength - 1
    for (let i = startIndex; i < input.length; i++) {
      const sequence = input.substring(i - startIndex, i + 1)

      let isStartMarker = true
      for (let char of sequence) {
        const charIsDuplicate = RegExp(`${char}{1}.*${char}{1}`).test(sequence)
        isStartMarker = !charIsDuplicate
        if (!isStartMarker) break
      }

      if (isStartMarker) {
        return i + 1
      }
    }
  }
}

import { SolutionBase } from "../util/SolutionBase.js"

export class Solution extends SolutionBase {
  async solve() {
    const input = await this.readInput()

    const startOfPacketMarker = this.detectStartMarker(input, 4)
    console.log("Start-of-packet-marker occurs after", startOfPacketMarker)

    const startOfMessageMarker = this.detectStartMarker(input, 14)
    console.log("Start-of-message-marker occurs after", startOfMessageMarker)
  }

  detectStartMarker(input: string, markerLength: number) {
    const startIndex = markerLength - 1
    for (let i = startIndex; i < input.length; i++) {
      const sequence = input.substring(i - startIndex, i + 1)
      let canBeStartOfPacketMarker = true
      for (let char of sequence) {
        const charIsDoubled = new RegExp(`${char}{1}.*${char}{1}`).test(
          sequence
        )
        canBeStartOfPacketMarker = !charIsDoubled
        if (!canBeStartOfPacketMarker) break
      }
      if (canBeStartOfPacketMarker) {
        return i + 1
      }
    }
  }
}

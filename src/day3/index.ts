import { SolutionBase } from "../util/SolutionBase.js"

export class Solution extends SolutionBase {
  private priorityList: Record<string, number>

  constructor(path: string) {
    super(path)
    this.priorityList = this.generatePriorityList()
  }

  generateBigLetterAlphabet() {
    return Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65))
  }

  generateSmallLetterAlphabet() {
    return this.generateBigLetterAlphabet().map((letter) =>
      letter.toLowerCase()
    )
  }

  generatePriorityList() {
    const priorityList: Record<string, number> = {}
    this.generateSmallLetterAlphabet().forEach((letter, i) => {
      priorityList[letter] = i + 1
    })
    this.generateBigLetterAlphabet().forEach((letter, i) => {
      priorityList[letter] = i + 27
    })
    return priorityList
  }

  async solve() {
    const input = await this.readInput()
    this.partOne(input)
    this.partTwo(input)
  }

  partOne(input: string) {
    const rucksacksRaw = input.trim().split("\n")
    const rucksacks = rucksacksRaw.map((r) => {
      const firstHalf = r.slice(0, r.length / 2)
      const lastHalf = r.replace(firstHalf, "")
      return {
        firstCompartment: firstHalf.split(""),
        lastCompartment: lastHalf.split(""),
      }
    })

    const commonItems = rucksacks.map((r) => {
      const commonItem = r.firstCompartment.find((item) =>
        r.lastCompartment.includes(item)
      )
      return commonItem || ""
    })

    console.log("Part 1: The cumulated common item priorities are:")
    console.log(
      commonItems.reduce((sum, item) => sum + this.priorityList[item], 0)
    )
  }

  partTwo(input: string) {
    const groupsOfThreeRaw = input.trim().match(/\w+\n\w+\n\w+/gm)
    const groupsOfThree = groupsOfThreeRaw?.map((g) =>
      g.split("\n").map((str) => str.split(""))
    )

    const commonItems = groupsOfThree?.map((g) => {
      const commonItem = g[0].find(
        (item) => g[1].includes(item) && g[2].includes(item)
      )
      return commonItem || "?"
    })

    console.log(
      "Part 2 (groups of three): The cumulated common item priorities are:"
    )
    console.log(
      commonItems?.reduce((sum, item) => sum + this.priorityList[item], 0)
    )
  }
}

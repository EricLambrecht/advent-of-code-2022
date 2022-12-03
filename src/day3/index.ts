import { SolutionBase } from "../util/SolutionBase.js"

export class Solution extends SolutionBase {
  private priorityList: Record<string, number>

  constructor(path: string) {
    super(path)
    this.priorityList = this.generatePriorityList()
  }

  generatePriorityList() {
    const priorityList: Record<string, number> = {}
    const bigLetterAlphabet = Array.from(Array(26)).map((e, i) =>
      String.fromCharCode(i + 65)
    )
    const smallLetterAlphabet = bigLetterAlphabet.map((letter) =>
      letter.toLowerCase()
    )

    ;[...smallLetterAlphabet, ...bigLetterAlphabet].forEach((letter, i) => {
      priorityList[letter] = i + 1
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

    const commonItems = rucksacks.map((r) =>
      r.firstCompartment.find((item) => r.lastCompartment.includes(item))
    )

    const result = commonItems?.reduce(
      (sum, item) => (item ? sum + this.priorityList[item] : sum),
      0
    )

    console.log("Part 1: The cumulated common item priorities are:", result)
  }

  partTwo(input: string) {
    const groupsOfThreeRaw = input.trim().match(/\w+\n\w+\n\w+/gm)
    const groupsOfThree = groupsOfThreeRaw?.map((g) =>
      g.split("\n").map((str) => str.split(""))
    )

    const commonItems = groupsOfThree?.map((group) =>
      group[0].find(
        (item) => group[1].includes(item) && group[2].includes(item)
      )
    )

    const result = commonItems?.reduce(
      (sum, item) => (item ? sum + this.priorityList[item] : sum),
      0
    )

    console.log(
      "Part 2 (groups of three): The cumulated common item priorities are:",
      result
    )
  }
}

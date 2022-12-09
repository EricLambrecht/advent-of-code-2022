import { Solution } from "../day9"

describe("Day 9", () => {
  const solution = new Solution("./src/day9")

  describe("Part 1", () => {
    it("returns the correct solution", async () => {
      await expect(solution.part1("test_input.txt")).resolves.toBe(13)
    })
  })

  describe("Part 2", () => {
    it("returns the correct solution", async () => {
      await expect(solution.part2("test_input2.txt")).resolves.toBe(36)
    })
  })
})

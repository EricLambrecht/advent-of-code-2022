import { Solution } from "../day10"

describe("Day 10", function () {
  const solution = new Solution("./src/day10")

  describe("Register is set correctly", function () {
    it("increases cycle number for noop and nothing else", () => {
      const onCycle = jest.fn()
      let pd = { cycleNumber: 1, xRegister: 1 }
      pd = solution.executeInstruction("noop", pd, onCycle)
      expect(pd.cycleNumber).toBe(2)
      expect(pd.xRegister).toBe(1)
      expect(onCycle).toHaveBeenCalledTimes(1)
      expect(onCycle).toHaveBeenCalledWith(
        expect.objectContaining({ cycleNumber: 2, xRegister: 1 })
      )
    })

    it("parses addx 3 correctly", () => {
      const onCycle = jest.fn()
      let pd = { cycleNumber: 2, xRegister: 1 }
      pd = solution.executeInstruction("addx 3", pd, onCycle)
      expect(pd.cycleNumber).toBe(4)
      expect(pd.xRegister).toBe(4)
      expect(onCycle).toHaveBeenCalledTimes(2)
      expect(onCycle).toHaveBeenCalledWith(
        expect.objectContaining({ cycleNumber: 3, xRegister: 1 })
      )
      expect(onCycle).toHaveBeenCalledWith(
        expect.objectContaining({ cycleNumber: 4, xRegister: 1 })
      )
    })

    it("parses addx -5 correctly", () => {
      const onCycle = jest.fn()
      let pd = { cycleNumber: 4, xRegister: 4 }
      pd = solution.executeInstruction("addx -5", pd, onCycle)
      expect(pd.cycleNumber).toBe(6)
      expect(pd.xRegister).toBe(-1)
      expect(onCycle).toHaveBeenCalledTimes(2)
      expect(onCycle).toHaveBeenCalledWith(
        expect.objectContaining({ cycleNumber: 5, xRegister: 4 })
      )
      expect(onCycle).toHaveBeenCalledWith(
        expect.objectContaining({ cycleNumber: 6, xRegister: 4 })
      )
    })
  })

  describe("part 1", function () {
    it("solves test riddle correctly", async () => {
      await expect(solution.part1("test_input.txt")).resolves.toBe(13140)
    })
  })

  describe("part 2", function () {
    it("solves the test riddle correctly", async () => {
      const expectedResult =
        "##..##..##..##..##..##..##..##..##..##..\n" +
        "###...###...###...###...###...###...###.\n" +
        "####....####....####....####....####....\n" +
        "#####.....#####.....#####.....#####.....\n" +
        "######......######......######......####\n" +
        "#######.......#######.......#######....."
      await expect(solution.part2("test_input.txt")).resolves.toBe(
        expectedResult
      )
    })
  })
})

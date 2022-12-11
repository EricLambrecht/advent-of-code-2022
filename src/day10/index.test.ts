import { Solution } from "../day10"

describe("Day 10", function() {
  const solution = new Solution("./src/day10")

  describe("Register is set correctly", function() {
    it('increases cycle number for noop and nothing else', () => {
      let pd = { cycleNumber: 1, xRegister: 1, signalStrengths: 0}
      pd = solution.executeInstruction("noop", pd)
      expect(pd.cycleNumber).toBe(2)
      expect(pd.xRegister).toBe(1)
      expect(pd.signalStrengths).toBe(0)
    })

    it('parses addx 3 correctly', () => {
      let pd = { cycleNumber: 2, xRegister: 1, signalStrengths: 0}
      pd = solution.executeInstruction("addx 3", pd)
      expect(pd.cycleNumber).toBe(4)
      expect(pd.xRegister).toBe(4)
      expect(pd.signalStrengths).toBe(0)
    })

    it('parses addx -5 correctly', () => {
      let pd = { cycleNumber: 4, xRegister: 4, signalStrengths: 0}
      pd = solution.executeInstruction("addx -5", pd)
      expect(pd.cycleNumber).toBe(6)
      expect(pd.xRegister).toBe(-1)
      expect(pd.signalStrengths).toBe(0)
    })

    it('increases signal strength correctly with noop', () => {
      let pd = { cycleNumber: 19, xRegister: 5, signalStrengths: 0}
      pd = solution.executeInstruction("noop", pd)
      expect(pd.cycleNumber).toBe(20)
      expect(pd.xRegister).toBe(5)
      expect(pd.signalStrengths).toBe(100)
    })

    it('increases signal strength correctly with addx', () => {
      let pd = { cycleNumber: 19, xRegister: 5, signalStrengths: 0}
      pd = solution.executeInstruction("addx 8", pd)
      expect(pd.cycleNumber).toBe(21)
      expect(pd.xRegister).toBe(13)
      expect(pd.signalStrengths).toBe(100)
    })
  });

  describe("part 1", function() {
    it('solves test riddle correctly', async () => {
      await expect(solution.part1("test_input.txt")).resolves.toBe(13140)
    })
  });
});
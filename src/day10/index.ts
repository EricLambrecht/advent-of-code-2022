import { SolutionBase } from "../util/SolutionBase.js"
import prompts from "prompts";
import number = prompts.prompts.number;

const CYCLE_LENGTHS: Record<string, number> = {
  addx: 2,
  noop: 1
}

type ProgramData = {
  cycleNumber: number
  xRegister: number
  signalStrengths: number
}

export class Solution extends SolutionBase {
  async solve() {
    const signalStrengths = await this.part1("test_input.txt")
    this.outputPart1(signalStrengths)
  }

  async part1(fileName?: string) {
    const instructions = await this.readInputLines(fileName)

    let programData = { cycleNumber: 1, xRegister: 1, signalStrengths: 0 }

    for (let instruction of instructions) {
      programData = this.executeInstruction(instruction, programData)
    }

    return programData.signalStrengths
  }

  executeInstruction(instruction: string, programData: ProgramData): ProgramData {
    let { cycleNumber, xRegister, signalStrengths } = programData
    const [name,value] = instruction.split( ' ')
    const cycleLength = CYCLE_LENGTHS[name]
    console.log(name, cycleLength)
    for (let i = cycleLength; i > 0; i--) {
      cycleNumber++
      if ((cycleNumber + 20) % 40 === 0) {
        console.log(cycleNumber, xRegister, signalStrengths)
        signalStrengths += this.calculateSignalStrength(cycleNumber, xRegister)
      }
      if (i == 1 && value) {
        xRegister += ~~value
      }
    }
    return { cycleNumber, xRegister, signalStrengths}
  }

  calculateSignalStrength(cycleNumber: number, xRegisterValue: number) {
    console.log('calculating strength for cycle no.', cycleNumber)
    return cycleNumber * xRegisterValue
  }
}
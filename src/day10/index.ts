import { SolutionBase } from "../util/SolutionBase.js"

const CYCLE_LENGTHS: Record<string, number> = {
  addx: 2,
  noop: 1,
}

type ProgramData = {
  cycleNumber: number
  xRegister: number
}

export class Solution extends SolutionBase {
  async solve() {
    const signalStrengths = await this.part1()
    this.outputPart1(signalStrengths)

    const screen = await this.part2()
    this.outputPart2(screen)
  }

  async part1(fileName?: string) {
    const instructions = await this.readInputLines(fileName)

    let signalStrengths = 0
    let programData = { cycleNumber: 0, xRegister: 1 }

    for (let instruction of instructions) {
      programData = this.executeInstruction(
        instruction,
        programData,
        ({ cycleNumber, xRegister }) => {
          if ((cycleNumber + 20) % 40 === 0) {
            signalStrengths += this.calculateSignalStrength(
              cycleNumber,
              xRegister
            )
          }
        }
      )
    }

    return signalStrengths
  }

  async part2(fileName?: string) {
    const instructions = await this.readInputLines(fileName)

    const SCREEN_WIDTH = 40
    let crtPosition = 0
    let screen = ""
    let programData = { cycleNumber: 0, xRegister: 1 }

    for (let instruction of instructions) {
      programData = this.executeInstruction(
        instruction,
        programData,
        ({ xRegister }) => {
          if (crtPosition === 0) {
            screen += "\n"
          }

          let spritePosition = this.getSpritePosition(xRegister)
          const isLit = spritePosition.includes(crtPosition)
          screen += isLit ? "#" : "."
          crtPosition++
          crtPosition %= SCREEN_WIDTH
        }
      )
    }

    return screen
  }

  getSpritePosition(xRegister: number) {
    const SPRITE_LENGTH = 3
    return Array(SPRITE_LENGTH)
      .fill(null)
      .map((_, i) => xRegister - i + 1)
  }

  executeInstruction(
    instruction: string,
    programData: ProgramData,
    onCycle: (programData: ProgramData) => void
  ): ProgramData {
    let { cycleNumber, xRegister } = programData
    const [name, value] = instruction.split(" ")
    const cycleLength = CYCLE_LENGTHS[name]

    for (let i = cycleLength; i > 0; i--) {
      cycleNumber++
      onCycle({ cycleNumber, xRegister })
      if (i == 1 && value) {
        xRegister += ~~value
      }
    }

    return { cycleNumber, xRegister }
  }

  calculateSignalStrength(cycleNumber: number, xRegisterValue: number) {
    return cycleNumber * xRegisterValue
  }
}

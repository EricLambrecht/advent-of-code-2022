import { SolutionBase } from "../util/SolutionBase.js"
import readline from "readline"
const rl = readline.createInterface(process.stdin, process.stdout)

interface Position {
  x: number
  y: number
}
type Distance = Position
type Axis = "x" | "y"

export class Solution extends SolutionBase {
  async solve() {
    this.outputPart1(await this.part1())
    this.outputPart2(await this.part2())
    rl.close()
  }

  async part1(fileName?: string): Promise<number> {
    const visitedTailPositions: Record<string, boolean> = {}
    const headPosition = this.toPos(0, 0)
    const tailPosition = this.toPos(0, 0)
    const instructions = await this.readInputLines(fileName)

    for (let instruction of instructions) {
      const [, direction, distance] = instruction.match(/(\w) (\d+)/)!
      const axis = direction === "L" || direction === "R" ? "x" : "y"
      const forward = direction === "R" || direction === "U"

      for (let d = 0; d < ~~distance; d++) {
        if (forward) {
          headPosition[axis]++
        } else {
          headPosition[axis]--
        }

        this.followKnot(headPosition, tailPosition)
        visitedTailPositions[this.positionToString(tailPosition)] = true
      }
    }
    return Object.keys(visitedTailPositions).length
  }

  /**
   * Technically this is the more modular solution that could have also been used
   * for part 1, if the knot amount would not hardcoded to 9 but a function argument instead. :)
   * @param fileName instruction input file
   * @param visualize if true, a visualization is rendered to the console (you'll need a big window!)
   */
  async part2(fileName?: string, visualize = false): Promise<number> {
    const instructions = await this.readInputLines(fileName)
    const visitedTailPositions: Record<string, boolean> = {}
    const headPosition = this.toPos(0, 0)
    const knotPositions = Array(9) // if this 9 would be a variable, this could be used for part 1 as well
      .fill(null)
      .map(() => this.toPos(0, 0))

    if (visualize) {
      await this.renderFrame(-15, -5, 20, 17, headPosition, knotPositions)
    }

    for (let instruction of instructions) {
      const [, direction, distance] = instruction.match(/(\w) (\d+)/)!
      const axis = direction === "L" || direction === "R" ? "x" : "y"
      const forward = direction === "R" || direction === "U"

      for (let d = 0; d < ~~distance; d++) {
        if (forward) {
          headPosition[axis]++
        } else {
          headPosition[axis]--
        }

        for (let knotIndex = 0; knotIndex < knotPositions.length; knotIndex++) {
          this.followKnot(
            knotIndex === 0 ? headPosition : knotPositions[knotIndex - 1],
            knotPositions[knotIndex]
          )
          if (visualize) {
            await this.renderFrame(-15, -5, 20, 17, headPosition, knotPositions)
          }
        }
        visitedTailPositions[this.positionToString(knotPositions[8])] = true
      }
    }
    return Object.keys(visitedTailPositions).length
  }

  /**
   * This moves the backKnot towards the frontKnot according to the rules
   * described in https://adventofcode.com/2022/day/9
   * @param frontKnot
   * @param backKnot
   */
  followKnot(frontKnot: Position, backKnot: Position) {
    const distance = this.getDistance(frontKnot, backKnot)
    for (let [a1, a2] of [
      ["x", "y"],
      ["y", "x"],
    ]) {
      if (Math.abs(distance[a1 as Axis]) >= 2) {
        distance[a1 as Axis] > 0
          ? backKnot[a1 as Axis]++
          : backKnot[a1 as Axis]--
        if (distance[a2 as Axis] !== 0) {
          distance[a2 as Axis] > 0
            ? backKnot[a2 as Axis]++
            : backKnot[a2 as Axis]--
        }
        break
      }
    }
  }

  toPos(x: number, y: number) {
    return { x, y }
  }

  getDistance(a: Position, b: Position) {
    return this.toPos(a.x - b.x, a.y - b.y) as Distance
  }

  positionToString(position: Position) {
    return [position.x, position.y].join(",")
  }

  // >>>>
  // the following code is for CLI visualization only
  // >>>>

  clearFrame(frameHeight: number) {
    readline.moveCursor(process.stdout, 0, -frameHeight)
    readline.clearScreenDown(process.stdout)
  }

  drawFrame(
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
    head: Position,
    tails: Position[]
  ) {
    for (let y = maxY - 1; y >= minY; y--) {
      for (let x = minX; x < maxX; x++) {
        const isHeadPosition = head.x === x && head.y === y
        const tailPositionIndex = tails.findIndex(
          (tail) => tail.x === x && tail.y === y
        )
        const tailChar = tailPositionIndex !== -1 ? tailPositionIndex + 1 : null
        const renderChar = isHeadPosition
          ? "H"
          : tailChar
          ? tailChar.toString()
          : "."
        rl.write(renderChar)
      }
      rl.write("\n")
    }
  }

  async renderFrame(
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
    head: Position,
    tails: Position[],
    isFirstFrame = false
  ) {
    if (!isFirstFrame) {
      this.clearFrame(maxY - minY)
    }
    this.drawFrame(minX, minY, maxX, maxY, head, tails)
    await this.sleep(40)
  }
}

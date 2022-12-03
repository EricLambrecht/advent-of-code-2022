import { SolutionBase } from "../util/SolutionBase.js"

type OpponentShape = "A" | "B" | "C"
type ResponseCode = "X" | "Y" | "Z"
type ResponseShape = "X" | "Y" | "Z"

type Rules = {
  [key in ResponseShape]: {
    [key in OpponentShape]: Outcome
  }
}

type RealStrategyGuide = {
  [key in OpponentShape]: {
    [key in ResponseCode]: ResponseShape
  }
}

enum Outcome {
  Win = "win",
  Draw = "draw",
  Loss = "loss",
}

const rulesOfRockPaperScissors: Rules = {
  X: { A: Outcome.Draw, B: Outcome.Loss, C: Outcome.Win },
  Y: { A: Outcome.Win, B: Outcome.Draw, C: Outcome.Loss },
  Z: { A: Outcome.Loss, B: Outcome.Win, C: Outcome.Draw },
}

const realStrategyGuide: RealStrategyGuide = {
  A: { X: "Z", Y: "X", Z: "Y" },
  B: { X: "X", Y: "Y", Z: "Z" },
  C: { X: "Y", Y: "Z", Z: "X" },
}

const scoresByOutcome = {
  loss: 0,
  draw: 3,
  win: 6,
}

const scoresByShape = {
  X: 1,
  Y: 2,
  Z: 3,
}

export class Solution extends SolutionBase {
  async solve() {
    const input = await this.readInput()
    const lines = input.trim().split("\n")
    const strategyGuide = lines.map((l) => ({
      oppponentMove: l.charAt(0) as OpponentShape,
      response: l.charAt(2) as ResponseCode,
    }))

    const totalScore = strategyGuide.reduce((currentScore, step) => {
      const outcome =
        rulesOfRockPaperScissors[step.response as ResponseShape][
          step.oppponentMove
        ]
      const outcomeScore = scoresByOutcome[outcome]
      const shapeScore = scoresByShape[step.response]
      return currentScore + outcomeScore + shapeScore
    }, 0)

    console.log("Part 1. Score according to strategy guide:")
    console.log(totalScore)

    const totalScorePart2 = strategyGuide.reduce((currentScore, step) => {
      const expectedResponseShape =
        realStrategyGuide[step.oppponentMove][step.response]
      const outcome =
        rulesOfRockPaperScissors[expectedResponseShape][step.oppponentMove]
      const outcomeScore = scoresByOutcome[outcome]
      const shapeScore = scoresByShape[step.response]
      return currentScore + outcomeScore + shapeScore
    }, 0)

    console.log("Part 2. Score according to the real™ strategy guide:")
    console.log(totalScorePart2)
  }
}

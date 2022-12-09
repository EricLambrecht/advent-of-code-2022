import { SolutionBase } from "../util/SolutionBase.js"

type Tree = {
  x: number
  y: number
  height: number
}

export class Solution extends SolutionBase {
  async solve() {
    await this.part1()
    await this.part2()
  }

  toXY(columnIndex: number, rowIndex: number) {
    return [columnIndex, rowIndex].join(",")
  }

  /**
   * I'm not happy at all with this solution, but at least it works... :/
   */
  async part1() {
    const rowsRaw = await this.readInputLines()
    const gridRows = rowsRaw.map((r) => r.split("").map((c) => ~~c))
    const columnCount = gridRows[0].length

    let maxLeft = 0
    let maxRight = 0
    const maxTopPerColumn: number[] = []
    const maxBottomPerColumn: number[] = []
    const visibleFromTheLeft: Tree[] = []
    let visibleFromTheRight: Tree[] = []
    const visibleFromTheTop: Tree[] = []
    let visibleFromTheBottom: Tree[] = []

    gridRows.forEach((row, rowIndex) => {
      maxLeft = -1
      maxRight = -1
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        const maxTop = maxTopPerColumn[columnIndex] ?? -1
        const maxBottom = maxBottomPerColumn[columnIndex] ?? -1
        const height = ~~row[columnIndex]
        const currentTree = { x: columnIndex, y: rowIndex, height } as Tree

        if (height > maxLeft) {
          visibleFromTheLeft.push(currentTree)
          maxLeft = height
        }

        if (height >= maxRight) {
          maxRight = height
        }
        visibleFromTheRight = visibleFromTheRight.filter(
          (tree) => tree.y !== rowIndex || tree.height > height
        )
        visibleFromTheRight.push(currentTree)

        if (height > maxTop) {
          visibleFromTheTop.push(currentTree)
          maxTopPerColumn[columnIndex] = height
        }

        if (height > maxBottom) {
          maxBottomPerColumn[columnIndex] = height
        }
        visibleFromTheBottom = visibleFromTheBottom.filter(
          (tree) => tree.x !== columnIndex || tree.height > height
        )
        visibleFromTheBottom.push(currentTree)
      }
    })

    const visibleTrees: Record<string, boolean> = {}

    ;[
      ...visibleFromTheLeft,
      ...visibleFromTheRight,
      ...visibleFromTheTop,
      ...visibleFromTheBottom,
    ].forEach((tree) => (visibleTrees[this.toXY(tree.x, tree.y)] = true))

    this.outputPart1(Object.values(visibleTrees).length)
  }

  /**
   * This is by no means meant to be performant :D
   */
  async part2() {
    const rowsRaw = await this.readInputLines()
    const treeGrid = rowsRaw.map((r) => r.split("").map((c) => ~~c))

    const scenicScores: Record<string, number> = {}

    treeGrid.forEach((row, rowIndex) => {
      row.forEach((treeHeight, columnIndex) => {
        const xy = this.toXY(columnIndex, rowIndex)

        const topCount = this.countViewableTrees(treeGrid, rowIndex, 0, {
          columnIndex,
        })
        const leftCount = this.countViewableTrees(treeGrid, columnIndex, 0, {
          rowIndex,
        })
        const bottomCount = this.countViewableTrees(
          treeGrid,
          rowIndex,
          treeGrid.length - 1,
          { columnIndex }
        )
        const rightCount = this.countViewableTrees(
          treeGrid,
          columnIndex,
          row.length - 1,
          { rowIndex }
        )

        scenicScores[xy] = topCount * rightCount * bottomCount * leftCount
      })
    })

    const [mostScenicTree] = Object.entries(scenicScores).sort(
      ([, aScore], [, bScore]) => bScore - aScore
    )

    this.outputPart2(mostScenicTree)
  }

  /**
   * You have to set either x or y in order for this to work.
   */
  countViewableTrees(
    trees: number[][],
    from: number,
    to: number,
    { columnIndex, rowIndex }: { columnIndex?: number; rowIndex?: number }
  ) {
    const viewHeight = trees[rowIndex ?? from][columnIndex ?? from]
    const isBackwards = from > to
    let counter = 0
    for (
      let i = from;
      isBackwards ? i >= to : i <= to;
      isBackwards ? i-- : i++
    ) {
      if (i === from) continue
      const treeHeight = trees[rowIndex ?? i][columnIndex ?? i]
      counter++
      if (treeHeight >= viewHeight) {
        break
      }
    }
    return counter
  }
}

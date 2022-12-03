import prompts from "prompts"
import colors from "colors/safe.js"

console.log("ADVENT OF CODE 2022")

const runDay = async (d: number) => {
  const module = await import(`./day${d}/index.ts`)
  if (!module.Solution) {
    console.error(
      'module does not contain a solution! Make sure to export a named member "Solution".'
    )
    return
  }
  const { Solution } = module

  console.log(colors.bold(`Day ${d}`))
  const solution = new Solution(`./src/day${d}`)
  await solution.solve()
}

const [, , dayArg] = process.argv

if (dayArg) {
  await runDay(Number.parseInt(dayArg))
} else {
  const { day } = await prompts({
    type: "number",
    name: "day",
    message: "Which day do you want to run?",
    validate: (v) => v > 0 && v < 26,
  })
  await runDay(day)
}

export {}

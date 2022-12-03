import prompts from "prompts";

console.log("ADVENT OF CODE 2022");

const runDay = async (d: number) => {
  const module = await import(`./day${d}/index.ts`);
  await module.run();
};

const [, , dayArg] = process.argv;

if (dayArg) {
  await runDay(Number.parseInt(dayArg));
} else {
  const { day } = await prompts({
    type: "number",
    name: "day",
    message: "Which day do you want to run?",
    validate: (v) => v > 0 && v < 26,
  });
  await runDay(day);
}

export {};

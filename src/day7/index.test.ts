import { FileSystem, Solution } from "./index"

const createDir = (size: number, directories = {}) => ({
  name: "",
  size,
  directories,
  files: {},
})

const fileSystemFixture = {
  root: {
    name: "root",
    files: {},
    directories: {
      fooBar: createDir(450, { subDir: createDir(10) }),
      lol: createDir(3),
    },
    size: 2000,
  },
}

describe("Day 7 Tests", () => {
  const solution = new Solution("./src/day7")
  describe("recursive accumulation", () => {
    it("calculates correctly", () => {
      const result = solution.recursivelyAccumulateSize(fileSystemFixture.root)
      expect(result).toBe(2463)
    })
  })

  describe("file system parsing", () => {
    let fileSystem: FileSystem

    beforeAll(async () => {
      fileSystem = await solution.parseFileSystemFromInput("test_input.txt")
    })

    it("detects top folders", () => {
      expect(fileSystem.root.directories).toHaveProperty("a")
      expect(fileSystem.root.directories).toHaveProperty("d")
    })

    it("calculates root size correctly", () => {
      expect(fileSystem.root.size).toBe(48381165)
    })

    it("calculates e-folder size correctly", () => {
      expect(fileSystem.root.directories["a"].directories["e"].size).toBe(584)
    })

    it("calculates a-folder size correctly", () => {
      expect(fileSystem.root.directories["a"].size).toBe(94853)
    })

    it("calculates d-folder size correctly", () => {
      expect(fileSystem.root.directories["d"].size).toBe(24933642)
    })
  })

  describe("directory flat mapping", () => {
    it("flat maps correctly", () => {
      expect(solution.flatMapDirectories(fileSystemFixture.root)).toHaveLength(
        4
      )
    })
  })
})

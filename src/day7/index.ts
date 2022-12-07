import { SolutionBase } from "../util/SolutionBase.js"

interface File {
  name: string
  size: number
}

interface Directory {
  name: string
  size: number
  files: Record<string, File>
  directories: Record<string, Directory>
}

export interface FileSystem {
  root: Directory
}

const COMMAND_REGEX = /^\$ (\w+)\s*(\w+|\/|\.\.)*$/
const DIR_REGEX = /^dir (\w+)$/
const FILE_REGEX = /^(\d+) ([\w|\.]+)$/

const PART1_MAX_SIZE = 100000

const PART2_TOTAL_DISK_SPACE = 70000000
const PART2_UPDATE_SIZE_REQUIREMENT = 30000000

export class Solution extends SolutionBase {
  async solve() {
    // Part 1:
    const fileSystem = await this.parseFileSystemFromInput()
    this.outputPart1(this.recursivelyAccumulateSize(fileSystem.root))

    // Part 2:
    const unusedDiskSpace = PART2_TOTAL_DISK_SPACE - fileSystem.root.size
    const requiredSpace = PART2_UPDATE_SIZE_REQUIREMENT - unusedDiskSpace

    const allDirectories = this.flatMapDirectories(fileSystem.root)
    allDirectories.sort((a, b) => a.size - b.size) // small to large
    const dirToDelete = allDirectories.find((dir) => dir.size > requiredSpace)
    this.outputPart2(dirToDelete?.size || "No directory found")
  }

  async parseFileSystemFromInput(fileName?: string): Promise<FileSystem> {
    const inputLines = await this.readInputLines(fileName)
    const fileSystem: FileSystem = {
      root: this.createEmptyDirectory("root"),
    }

    // the path is an array here: root/dir1/dirB would be [root, dir1, dirB] etc.
    let currentPath = [fileSystem.root]
    let cwd = fileSystem.root
    let parentDirectory = null

    for (let line of inputLines) {
      if (currentPath.length) {
        cwd = currentPath[currentPath.length - 1]
      }
      if (currentPath.length > 1) {
        parentDirectory = currentPath[currentPath.length - 2]
      }

      const commandMatch = line.match(COMMAND_REGEX)
      if (commandMatch) {
        const [, cmdName, cmdAttr] = commandMatch
        if (cmdName === "ls") continue
        if (cmdAttr === "/") {
          cwd = fileSystem.root
          continue
        }
        if (cmdAttr === "..") {
          if (!parentDirectory) {
            throw Error("There is no parent directory to go to")
          }
          parentDirectory.size += cwd.size
          currentPath.pop()
          continue
        }
        currentPath.push(cwd.directories?.[cmdAttr])
        continue
      }

      const dirMatch = line.match(DIR_REGEX)
      if (dirMatch) {
        const [, dirName] = dirMatch
        cwd.directories = {
          ...cwd.directories,
          [dirName]: this.createEmptyDirectory(dirName),
        }
        continue
      }

      const fileMatch = line.match(FILE_REGEX)
      if (fileMatch) {
        const [, fileSize, fileName] = fileMatch
        cwd.size += ~~fileSize
        cwd.files = {
          ...cwd.files,
          [fileName]: { name: fileName, size: ~~fileSize },
        }
      }
    }
    // This algorithm updates folder sizes only as soon as a folder is left.
    // However, The input does not "cd .." back to root again. Therefore, we have to manually traverse the tree
    // back to root to complete the process.
    while (currentPath.length > 1) {
      cwd = currentPath[currentPath.length - 1]
      parentDirectory = currentPath[currentPath.length - 2]

      if (parentDirectory && parentDirectory === fileSystem.root) {
        parentDirectory.size += cwd.size
      }
      currentPath.pop()
    }

    return fileSystem
  }

  createEmptyDirectory(name: string): Directory {
    return {
      name,
      size: 0,
      directories: {},
      files: {},
    }
  }

  /**
   * As required: file sizes are taken into account multiple times.
   * Directories larger that PART1_MAX_SIZE are ignored.
   * @param directory
   */
  recursivelyAccumulateSize(directory: Directory): number {
    const { size, directories } = directory
    const subFolderSize = Object.values(directories).reduce(
      (sum, dir) => sum + this.recursivelyAccumulateSize(dir),
      0
    )
    return subFolderSize + (size <= PART1_MAX_SIZE ? size : 0)
  }

  /**
   * This flattens a directory and all of its subdirectories (recursively)
   * into one big one-level array (or "list" if you will) of directories.
   * @param startingDirectory
   */
  flatMapDirectories(startingDirectory: Directory): Directory[] {
    const subDirectories = Object.values(startingDirectory.directories)
    if (subDirectories.length === 0) return [startingDirectory]

    const subDirectoriesFlattened = subDirectories.flatMap((dir) => {
      return this.flatMapDirectories(dir)
    })

    return [startingDirectory, ...subDirectoriesFlattened]
  }
}

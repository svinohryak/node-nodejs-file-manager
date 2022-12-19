import * as readline from "readline/promises";
import { homedir } from "os";
import { changeCWD, getUserName, handleCd, handleUp } from "./helpers.js";
import { list } from "./services/list.js";
import { handleExit } from "./services/exit.js";
import { getCommand } from "./services/get-command-from-input.js";
import { __dirname } from "./helpers.js";
import { readFile } from "./services/read-file.js";
import { addFile } from "./services/add-file.js";
import { renameFile } from "./services/rename-file.js";
import { removeFile } from "./services/remove-file.js";
import { cpFile } from "./services/copy-file.js";
import { moveFile } from "./services/move-file.js";
import { handleOs } from "./services/handle-os.js";
import { handleHash } from "./services/handle-hash.js";
import { handleCompress } from "./services/handle-compress.js";
import { handleDecompress } from "./services/handle-decompress.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const currentDirectory = async () => {
  const currentWorkingDirectory = process.cwd();
  console.log(`You are currently in ${currentWorkingDirectory}`);
};

const args = process.argv.slice(2);
const userName = getUserName(args);

console.log(`Welcome to the File Manager, ${userName}!`);

changeCWD(homedir());
currentDirectory();

const commandsMap = {
  cat: readFile,
  add: addFile,
  rn: renameFile,
  rm: removeFile,
  os: handleOs,
  cp: cpFile,
  mv: moveFile,
  hash: handleHash,
  compress: handleCompress,
  decompress: handleDecompress,
  ls: list,
  up: handleUp,
  cd: handleCd,
  ".exit": () => {
    rl.close();
    handleExit(userName);
  },
};

rl.on("line", (cmd) => {
  const [command, args = null, isError] = getCommand(cmd);

  if (isError) {
    console.log("\r\nInvalid input");
  } else {
    commandsMap[command](args)
      .then(() => currentDirectory())
      .catch((err) => {
        console.log("Operation failed\r\n");
      });
  }
});

rl.on("close", () => {
  console.log(`\r\nThank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
});

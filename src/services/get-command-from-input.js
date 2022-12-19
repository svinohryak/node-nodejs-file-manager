const commands = new Set([
  "up",
  "cd",
  "ls",
  "cat",
  "add",
  "rn",
  "cp",
  "mv",
  "rm",
  "os",
  "hash",
  "compress",
  "decompress",
  ".exit",
]);

export const getCommand = (cmd) => {
  const cmdArray = cmd
    .replace(/\s{2,}/g, " ")
    .trim()
    .split(" ");

  const [command, ...args] = cmdArray;
  let isError = false;

  if (!commands.has(command)) {
    isError = true;
  }

  return [command, args, isError];
};

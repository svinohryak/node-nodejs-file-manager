import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const getUserName = (args) => {
  const defaultUserName = "Unknown";

  const userName = args.map((arg) => {
    if (arg.startsWith("--username=")) {
      return arg.slice(arg.indexOf("=") + 1);
    }
  });

  return userName[0] ?? defaultUserName;
};

export const handleCd = async (args) => {
  try {
    process.chdir(resolve(args[0]));
  } catch (error) {
    console.log("\r\nOperation failed");
  }
};

export const changeCWD = (dir) => {
  process.chdir(dir);
};

export const handleUp = async () => {
  try {
    process.chdir("..");
  } catch (error) {
    console.log("Operation failed");
  }
};

export const handleMultipleWordsInput = (args) => {
  const argsString = args?.join(" ");
  const quotesValidationReg = /^([\"\']).*([\"\'])$/;

  if (args.length > 1) {
    return quotesValidationReg.test(argsString)
      ? resolve(argsString.replaceAll(/["']/g, ""))
      : null;
  }

  return args.length ? resolve(argsString.replaceAll(/["']/g, "")) : null;
};

export const handleTwoPathes = (args) => {
  if (args.length < 3) return args.map((i) => resolve(process.cwd(), i));

  const splitReg = /(\'|\")/;
  const argString = args.join(" ");
  const argsArray = argString
    .split(splitReg)
    .filter((i) => /[\w\d]/.test(i))
    .map((i) => resolve(process.cwd(), i.trim()));
  return argsArray;
};

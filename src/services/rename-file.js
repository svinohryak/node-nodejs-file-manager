import { rename } from "fs/promises";
import { resolve } from "path";
import { handleTwoPathes } from "../helpers.js";

export const renameFile = async (path) => {
  return new Promise((res, rej) => {
    const validatedPathes = handleTwoPathes(path);
    rename(resolve(validatedPathes[0]), resolve(validatedPathes[1]))
      .then(() => res())
      .catch(() => rej());
  });
};

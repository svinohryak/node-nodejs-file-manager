import { createWriteStream } from "fs";
import { handleMultipleWordsInput } from "../helpers.js";

export const addFile = async (path) => {
  return new Promise((res, rej) => {
    const name = handleMultipleWordsInput(path);

    if (!name) {
      console.log("Operation failed\r\n");
      res();
    }

    const writableStream = createWriteStream(name, { flags: "ax" });

    writableStream.on("error", () => {
      console.log("Operation failed\r\n");
    });
    writableStream.end(() => res());
  });
};

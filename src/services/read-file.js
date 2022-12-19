import { createReadStream } from "fs";
import { handleMultipleWordsInput } from "../helpers.js";

export const readFile = async (path) => {
  return new Promise((res, rej) => {
    const fileName = handleMultipleWordsInput(path);
    const readableStream = createReadStream(fileName, "utf-8");

    readableStream.on("data", (chunk) => {
      console.log(chunk);
    });

    readableStream.on("error", () => {
      console.log("Operation failed \r\n");
    });

    readableStream.on("end", () => res());
  });
};

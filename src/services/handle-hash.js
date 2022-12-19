import { createHash } from "node:crypto";
import { createReadStream } from "fs";
import { handleMultipleWordsInput } from "../helpers.js";

export const handleHash = async (args) => {
  return new Promise((res, rej) => {
    const path = handleMultipleWordsInput(args);
    const readableStream = createReadStream(path, { flags: "r" });
    const hasher = createHash("sha256").setEncoding("hex");

    readableStream.on("error", () => {
      rej();
    });

    readableStream.pipe(hasher).on("finish", () => {
      console.log(hasher.read());
      res();
    });
  });
};

import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream";
import { basename, join, extname } from "path";
import { createReadStream, createWriteStream } from "fs";
import { handleTwoPathes } from "../helpers.js";

export const handleDecompress = (args) => {
  return new Promise((res, rej) => {
    const [src, dest] = handleTwoPathes(args);
    const destDirWithName = join(dest, `${basename(src)}.txt`);

    const readableStream = createReadStream(src);
    const writableStream = createWriteStream(destDirWithName);
    const brotliCompress = createBrotliDecompress();

    pipeline(readableStream, brotliCompress, writableStream, (err) => {
      if (err) {
        rej();
      } else {
        res();
      }
    });
  });
};

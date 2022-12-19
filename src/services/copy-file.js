import { createReadStream, createWriteStream, access, constants } from "fs";
import { basename, join } from "path";
import { pipeline } from "stream";
import { handleTwoPathes } from "../helpers.js";

export const cpFile = async (args) => {
  return new Promise((res, rej) => {
    const [src, dest] = handleTwoPathes(args);
    const destDirWithName = join(dest, basename(src));

    access(src, constants.F_OK, (err) => {
      if (err) {
        rej();
      } else {
        const readableStream = createReadStream(src);
        const writableStream = createWriteStream(destDirWithName);

        pipeline(readableStream, writableStream, (err) => {
          if (err) {
            rej();
          } else {
            res();
          }
        });
      }
    });
  });
};

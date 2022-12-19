import { rm } from "fs/promises";
import { handleMultipleWordsInput } from "../helpers.js";

export const removeFile = async (args) => {
  try {
    const path = handleMultipleWordsInput(args);
    await rm(path);
  } catch (error) {
    console.log("operation failed");
  }
};

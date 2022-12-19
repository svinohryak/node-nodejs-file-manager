import { readdir } from "fs/promises";

export const list = async () => {
  try {
    const files = await readdir(process.cwd(), {
      withFileTypes: true,
    });

    const filteredList = files.filter((l) => l.isDirectory() || l.isFile());

    const namedList = filteredList.map((file) => {
      if (file.isDirectory()) {
        return { Name: file.name, Type: "directory" };
      }
      if (file.isFile()) {
        return { Name: file.name, Type: "file" };
      }
    });

    const sortedList = namedList.sort((a, b) => {
      const nameA = a.Name.toUpperCase();
      const nameB = b.Name.toUpperCase();

      if (a.Type !== b.Type) {
        return a.Type < b.Type ? -1 : 1;
      } else {
        return nameA < nameB ? -1 : 1;
      }
    });

    console.table(sortedList);
  } catch (error) {
    console.log("Operation failed");
  }
};

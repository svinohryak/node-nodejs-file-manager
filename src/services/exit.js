export const handleExit = async (userName) => {
  try {
    console.log(`\r\nThank you for using File Manager, ${userName}, goodbye!`);
    process.exit(0);
  } catch (error) {
    console.log(first)("\r\nOperation failed");
  }
};

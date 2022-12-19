import * as os from "os";

export const handleOs = async (args) => {
  return new Promise((res, rej) => {
    const command = args[0];

    switch (command) {
      case "--EOL":
        console.log(JSON.stringify(os.EOL));

        res();
        break;

      case "--cpus":
        const cpus = os.cpus();
        const amountOfCpus = cpus.length;

        console.log(`\r\nOverall amount of CPUS is ${amountOfCpus}`);

        const cpusInfoTable = cpus.reduce((acc, c) => {
          acc.push({ model: c.model, speed: c.speed / 1000 });
          return acc;
        }, []);

        console.table(cpusInfoTable);

        res();
        break;

      case "--homedir":
        console.log(os.homedir());

        res();
        break;

      case "--username":
        console.log(os.userInfo().username);

        res();
        break;

      case "--architecture":
        console.log(process.arch);

        res();
        break;

      default:
        rej();
    }
  });
};

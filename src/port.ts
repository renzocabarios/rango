import { exec, execSync } from "child_process";
import settings from "./settings";

function findOpenPort(port: number): number {
  try {
    execSync(`netstat -ano | findstr ${port}`);
    return findOpenPort(Math.floor(Math.random() * 65535));
  } catch (error) {
    return port;
  }
}

function checkUsedPort(port: number) {
  try {
    const matcher = new RegExp(/(LISTENING(?<pid>\d+))|(\d+SYN_SENT(?<tcp>\d+))|(?<wait>TIME_WAIT)/);
    const stdout = execSync(`netstat -ano | findstr ${port}`);
    const strOut = stdout.toString().replace(/\s/gm, "");
    const pid = matcher.exec(strOut)?.groups?.pid;
    const tcp = matcher.exec(strOut)?.groups?.tcp;
    const wait = matcher.exec(strOut)?.groups?.wait;

    return { pid, tcp, wait };
  } catch (error) {
    return { pid: undefined, tcp: undefined, wait: undefined };
  }
}

function taskKill(id: string, callback: () => void, error?: () => void) {
  exec(`taskkill /pid ${id} /T /F`, (err, stdout, stderr) => {
    if (stdout.includes("SUCCESS")) {
      return callback();
    }

    if (error) {
      error();
    }
  });
}

function freeAddressPort(port: number, listener: () => void) {
  let tries = 5;

  const interval = setInterval(() => {
    try {
      const { pid, tcp, wait } = checkUsedPort(port);
      const id = pid ?? tcp;

      if (!pid && !tcp && !wait) {
        listener();
        return clearInterval(interval);
      }

      if (tries < 1) {
        clearInterval(interval);
        throw new Error();
      }

      tries--;

      if (wait && tries === 1 && settings.get("KILL_PORT")) {
        tries++;
      }

      if (id !== undefined) {
        taskKill(id, () => {
          clearInterval(interval);
          listener();
        });
      }
    } catch (error) {
      console.log(error);

      clearInterval(interval);
    }
  }, 1000);
}

export { checkUsedPort, freeAddressPort, findOpenPort, taskKill };

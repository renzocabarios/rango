import { exec, execSync } from "child_process";

function findOpenPort(port: number): number {
  try {
    execSync(`netstat -ano | findstr ${port}`);
    return findOpenPort(Math.floor(Math.random() * 65535));
  } catch (error) {
    return port;
  }
}

function checkUsedPort(port: number) {
  const matcher = new RegExp(/(LISTENING(?<pid>\d+))|(\d+SYN_SENT(?<tcp>\d+))|(?<wait>TIME_WAIT)/);
  const stdout = execSync(`netstat -ano | findstr ${port}`);
  const strOut = stdout.toString().replace(/\s/gm, "");
  const pid = matcher.exec(strOut)?.groups?.pid;
  const tcp = matcher.exec(strOut)?.groups?.tcp;
  const wait = matcher.exec(strOut)?.groups?.wait;

  return { pid, tcp, wait };
}

function taskKill(id: string, callback: () => void, error?: () => void) {
  exec(`taskkill /f /im ${id}`, (err, stdout, stderr) => {
    console.log(err);

    if (stdout.includes("SUCCESS")) {
      callback();
      return;
    }

    if (error) {
      error();
    }
  });
}

function freeAddressPort(
  port: number,
  options: {
    pid: string | undefined;
    tcp: string | undefined;
    wait: string | undefined;
  },
  callback: () => void
) {
  let { pid, tcp, wait } = options;

  const startPortChecking = () => {
    const interval = setInterval(() => {
      try {
        if (!wait) {
          console.log("Waiting for port", port, "to be released...");
        }

        const pidTcp = checkUsedPort(port);
        const id = pidTcp?.pid ?? pidTcp?.tcp;

        if (id !== undefined) {
          taskKill(id, () => {
            clearInterval(interval);
            callback();
          });
        }
      } catch (error) {
        clearInterval(interval);
        callback();
      }
    }, 3000);
  };

  if (!pid && !tcp) {
    startPortChecking();
    return;
  }

  taskKill((pid ?? tcp) || "", callback, startPortChecking);
}

export { checkUsedPort, freeAddressPort, findOpenPort, taskKill };

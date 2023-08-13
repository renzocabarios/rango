import { exec, execSync } from "child_process";
import { AddressInfo } from "net";
import http from "http";

function findOpenPort(port: number): number {
  try {
    execSync(`netstat -ano | findstr ${port}`);
    return findOpenPort(Math.floor(Math.random() * 65535));
  } catch (error) {
    return port;
  }
}

function isPortUsed(port: number) {
  return new Promise((resolve, reject) => {
    exec(`netstat -ano | findstr ${port}`, (err, stdout, stderr) => (stdout ? reject(stdout) : resolve(false)));
  });
}

function checkUsedPort(port: number, callback: (stdout: string) => void, start: () => void) {
  isPortUsed(port)
    .then(() => start())
    .catch((error) => callback(error));
}

function freeAddressPort(port: number, callback: () => void) {
  return (stdout: string) => {
    const strOut = stdout.replace(/\s/gm, "");
    const matcher = new RegExp(/(LISTENING(?<pid>\d+))|(\d+SYN_SENT(?<tcp>\d+))|(?<wait>TIME_WAIT)/);
    let pid = matcher.exec(strOut)?.groups?.pid;
    let tcp = matcher.exec(strOut)?.groups?.tcp;
    const wait = matcher.exec(strOut)?.groups?.wait;

    const startPortChecking = () => {
      const interval = setInterval(() => {
        try {
          if (!wait) {
            console.log("Waiting for port", port, "to be released...");
          }

          const stdout = execSync(`netstat -ano | findstr ${port}`);
          const strOut = stdout.toString().replace(/\s/gm, "");
          pid = matcher.exec(strOut)?.groups?.pid;
          tcp = matcher.exec(strOut)?.groups?.tcp;

          if (pid !== undefined || tcp !== undefined) {
            exec(`taskkill /f /im ${pid ?? tcp}`, (err, stdout, stderr) => {
              if (stdout.includes("SUCCESS")) {
                clearInterval(interval);
                callback();
                return;
              }
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

    exec(`taskkill /f /im ${pid ?? tcp}`, (err, stdout, stderr) => {
      if (stdout.includes("SUCCESS")) return callback();
      startPortChecking();
    });
  };
}

export { checkUsedPort, freeAddressPort, findOpenPort, isPortUsed };

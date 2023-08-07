import { exec, execSync } from "child_process";
import { AddressInfo } from "net";
import http from "http";

function findOpenPort(): number {
  const port = Math.floor(Math.random() * 90000) + 10000;
  try {
    execSync(`netstat -ano | findstr ${port}`);
    return findOpenPort();
  } catch (error) {
    return port;
  }
}

function checkUsedPort(port: number, callback: (stdout: string) => void, start: () => void) {
  exec(`netstat -ano | findstr ${port}`, (err, stdout, stderr) => {
    if (stdout) {
      return callback(stdout);
    }

    start();
  });
}

function freeAddressPort(port: number, callback: () => void) {
  return (stdout: string) => {
    const strOut = stdout.replace(/\s/gm, "");
    const matcher = new RegExp(/LISTENING(?<pid>\d+)/);
    const pid = matcher.exec(strOut)?.groups?.pid;

    exec(`tskill ${pid} /f`, (err, stdout, stderr) => {
      if (stdout) {
        console.log(`Successfully open port number`, port);
        callback();
        return;
      }

      console.log(err ?? stderr);
    });
  };
}

function switchPort(port: number, server: http.Server) {
  return () => {
    console.log("Port", port, "already in used!", "Switching to any random open port.");

    server.listen(0, () => {
      const newPort = (server.address() as AddressInfo).port;
      console.log(`Server is listening on port`, newPort);
    });
  };
}

export { checkUsedPort, freeAddressPort, switchPort, findOpenPort };

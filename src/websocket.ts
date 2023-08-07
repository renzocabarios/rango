import { findOpenPort } from "./port";
import ws, { WebSocket } from "ws";
import fs from "fs";
import path from "path";
import minify from "./minify";

let WSS: ws.Server<WebSocket>;
let script = `<script src="/js/rango.js"></script>`;

const clients: ws[] = [];
const PORT = 6969;

function createSocket(port: number = 6969) {
  WSS = new ws.Server({ port });

  WSS.on("connection", (ws: ws) => {
    ws.on("close", () => {
      console.log("Rango refresh browser\x1b[0m");
    });

    clients.push(ws);
  });

  WSS.on("listening", () => {
    console.log("WebSocket listening on port", port);
  });

  const filename = `rango${port === PORT ? "" : "-" + port}`;
  script = `<script src="/js/${filename}.js"></script>`;

  let pathToWs = path.resolve(__dirname, "scripts/ws.js");

  if (!fs.existsSync(pathToWs)) {
    pathToWs = path.resolve(__dirname, "../scripts/ws.js");
  }

  minify(filename, pathToWs);

  return script;
}

function websocket() {
  return createSocket(findOpenPort(PORT));
}

function wsDisconnect() {
  clients.forEach((ws) => ws.close());

  if (WSS?.close) {
    WSS.close();
  }
}

function refreshScript() {
  return script;
}

export { websocket, wsDisconnect, refreshScript };

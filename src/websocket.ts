import websocket, { Server } from "ws";
import http from "http";
import path from "path";
import fs from "fs";
import minify from "./minify";
import { AddressInfo } from "net";
import settings from "./settings";

let WSS: websocket.Server<typeof websocket, typeof http.IncomingMessage>;
let filename = "ws-3000";

function createWebSocket(server: http.Server, port: number) {
  try {
    port = (server.address() as AddressInfo)?.port ?? port;

    filename = `ws-${port}`;

    WSS = new Server({ server });

    WSS.on("connection", () => {
      console.log("Web browser has restarted.");
    });

    WSS.on("listening", () => {
      console.log("Ready for HOT RELOAD!");
    });

    const wsScript = "scripts/ws.js";
    const resolvePath = path.resolve(__dirname, wsScript);
    const pathToWs = fs.existsSync(resolvePath) ? resolvePath : path.resolve(__dirname, `../${wsScript}`);

    minify(filename, pathToWs);
  } catch (error) {
    console.log(error);
  }
}

function refreshScript() {
  return `<script src="/${filename}.js"></script>`;
}

function runWebsocket(server: http.Server, port: number, callback?: () => void) {
  if (WSS !== undefined) return;

  // Run websocket for non-production environment
  if (process?.env?.PRODUCTION === undefined && settings.get("WEBSOCKET")) {
    createWebSocket(server, port);
    settings.set("WEBSOCKET", false);
  }

  return callback;
}

export { createWebSocket, runWebsocket, refreshScript };

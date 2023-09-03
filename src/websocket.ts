import websocket, { WebSocketServer } from "ws";
import http from "http";
import path from "path";
import fs from "fs";
import minify from "./minify";
import settings from "./settings";

type WebSocketInstance = websocket.Server<typeof websocket, typeof http.IncomingMessage>;
let WSS: WebSocketInstance;
let filename = "ws-3000";

function createWebSocket(server: http.Server, port: number): void {
  try {
    filename = `ws-${port}`;

    WSS = new WebSocketServer({ server });

    WSS.on("listening", () => {
      console.log("Initializing hot reload for development environment.");
    });

    const wsScript = "ws.js";
    const resolvePath = path.resolve(__dirname, wsScript);
    const pathToWs = fs.existsSync(resolvePath) ? resolvePath : path.resolve(__dirname, `../${wsScript}`);

    settings.set("WEBSOCKET", false);
    minify(filename, pathToWs);
  } catch (error) {
    console.log(error);
  }
}

function refreshScript() {
  return `<script src="/${filename}.js"></script>`;
}

function runWebsocket(server: http.Server, port: number): void {
  // Run websocket for non-production environment
  if (process?.env?.PRODUCTION === undefined && !process?.env?.PRODUCTION && settings.get("WEBSOCKET")) {
    createWebSocket(server, port);
  }
}

export { createWebSocket, runWebsocket, refreshScript };

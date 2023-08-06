import ws, { WebSocket } from "ws";

let WSS: ws.Server<WebSocket>;
const clients: ws[] = [];
const port = 6969;

function websocket() {
  WSS = new ws.Server({ port });

  WSS.on("connection", (ws: ws) => {
    ws.on("close", () => {
      console.log("Rango refresh browser\x1b[0m");
    });

    clients.push(ws);
  });
}

function wsDisconnect() {
  clients.forEach((ws) => ws.close());
  WSS.close();
}

function refreshScript() {
  return `<script src="/js/rango.js"></script>`;
}

export { websocket, wsDisconnect, refreshScript };

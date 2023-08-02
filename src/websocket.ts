import ws from "ws";

let WSS: ws.Server;
const clients: ws[] = [];
const port = 6969;

function websocket() {
  WSS = new ws.Server({ port });

  WSS.on("connection", (ws: ws) => {
    ws.on("close", () => {
      console.log("\x1b[32m[mayajs] Refresh browser\x1b[0m");
    });

    clients.push(ws);
  });
}

function wsDisconnect() {
  clients.forEach((ws) => ws.close());
  WSS.close();
}

function refreshScript() {
  return `<script src="/js/ws.js"></script>`;
}

export { websocket, wsDisconnect, refreshScript };

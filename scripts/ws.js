(() => {
  let hasError = false;
  let refresh = false;
  let interval = setInterval(refreshPage, 2000);

  const port = 6969;
  const delay = 2000;

  async function refreshPage() {
    let ws = new WebSocket(`ws://localhost:${port}`);

    ws.addEventListener("open", () => {
      console.log("Rango is running on web development mode.");

      clearInterval(interval);
      hasError = false;

      if (refresh === true) {
        refresh = false;
        window.location.reload();
        ws.send("reloaded");
      }
    });

    ws.addEventListener("close", () => {
      refresh = true;

      if (!hasError) {
        console.log("Rango is refreshing browser");
        interval = setInterval(refreshPage, delay);
      }
    });

    ws.addEventListener("error", () => {
      if (!hasError) {
        console.log("Rango failed to refresh browser. Waiting for connection...");
        clearInterval(interval);
        interval = setInterval(refreshPage, delay);
      }

      ws.close();
      hasError = true;
      refresh = true;
    });
  }
})();

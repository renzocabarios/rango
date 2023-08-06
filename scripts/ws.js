(() => {
  let openedSocketFlag = false;
  let hasError = false;
  let refresh = false;
  let interval = setInterval(waitConnection, 2000);
  const port = 6969;
  const delay = 2000;

  async function waitConnection() {
    if (!openedSocketFlag) await refreshPage();
  }

  async function refreshPage() {
    let ws = new WebSocket(`ws://localhost:${port}`);

    return new Promise((resolve, reject) => {
      ws.addEventListener("open", () => {
        console.log("Rango is running on web development mode.");

        clearInterval(interval);
        resolve();
        hasError = false;
        openedSocketFlag = true;

        if (refresh === true) {
          refresh = false;
          window.location.reload();
        }
      });

      ws.addEventListener("close", () => {
        refresh = true;
        openedSocketFlag = false;

        if (!hasError) {
          console.log("Rango refreshing browser");
          interval = setInterval(waitConnection, delay);
        }
      });

      ws.addEventListener("error", () => {
        if (!hasError) {
          console.log("Rango failed to refresh browser. Waiting for connection...");
          clearInterval(interval);
          interval = setInterval(waitConnection, delay);
        }

        ws.close();
        openedSocketFlag = false;
        hasError = true;
        refresh = true;
      });
    });
  }
})();

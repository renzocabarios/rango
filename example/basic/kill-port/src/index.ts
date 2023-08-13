// Import RangoJS and http module
import rango from "rango";

// Create an instance of the RangoJS app
const app = rango();

app.killPort();
app.logger(true);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

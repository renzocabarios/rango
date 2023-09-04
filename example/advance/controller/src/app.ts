import rango from "rango";
const app = rango();


// Define port number
const PORT = 3000;

// Start RangoJS and listen to port 3000
app.listen(PORT, () => console.log("Server listening on port", PORT));

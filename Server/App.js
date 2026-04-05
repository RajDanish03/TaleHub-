const express = require("express");
const app = express();
const connectDB = require("./DBConnections");
const cors = require("cors")
// Adds headers: Access-Control-Allow-Origin: *
app.use(cors())
app.use(express.json());

// Login and Register New user
app.use("/api/user", require("./Routes/User"));
// Blog CRUD
app.use("/api/blog", require("./Routes/Blog"));

app.listen(5000, () => {
    connectDB()
    console.log("Server Is Start At 5000");
});
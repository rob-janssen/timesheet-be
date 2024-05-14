const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const cors = require('cors')
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const origin = 'http://localhost:3000'
app.use(cors({
    credentials: true,
    origin
}));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/tasksRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}.`));

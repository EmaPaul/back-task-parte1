const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const taskRoutes = require("./routes/task.routes");

const app = express();
require("dotenv").config();

// Middlewares
app.use(
  cors({
    origin:["https://back-task-parte1.vercel.app/api/getTaskAll","https://back-task-parte1.vercel.app","http://localhost:3000","https://front-part-1-j3az6ff6r-emapauls-projects.vercel.app","https://front-part-1.vercel.app"],
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.set("port", process.env.PORT || 3000);
app.use("/api/", taskRoutes);

app.listen(app.get("port"), () => {
  console.log("listening on port", app.get("port"));
});

// MongoDB Connection
mongoose.set("strictQuery", false);

const mongoURI =process.env.MONGODB_URI_PROD


mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

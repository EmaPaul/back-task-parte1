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
    origin: process.env.NODE_ENV === "production"
      ? ["https://back-po5lc1urv-emapauls-projects.vercel.app/api/getTaskAll"]
      : "http://localhost:3000",
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

const mongoURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

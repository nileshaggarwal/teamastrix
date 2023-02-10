const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const appRouter = require("./routes/api.routes.js");
const { PORT, DB_URL } = require("./config");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Goals OKR API");
});

app.use("/api", appRouter);

// app.use(errorHandler);

const connectDB = async () => {
  await mongoose.set("strictQuery", true);

  await mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("db connected..!");
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

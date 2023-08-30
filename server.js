const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/db");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const mailRouter = require("./routes/gmail-routers");

const app = express();
app.use(bodyParser.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

connectDB();

app.use("/auth", authRoutes);
app.use('/api', mailRouter);
app.use("/protected", protectedRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from "express";
import dotenv from "dotenv";
import meetupRoutes from "./routes/meetup.routes.js";
import authRoutes from "./routes/auth.routes.js";
import passport from "./config/passport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());

app.use("/api/meetups", meetupRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Works!");
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import { createAdmin } from "./src/config/seeder.js";
import router from "./src/routes/route.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Test working");
});

app.use("/user", router);

const PORT = process.env.PORT || 5000;

const init = async () => {
  try {
    await connectDB();
    await createAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Init error:", error);
  }
};

init();
import app from "./app.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT || 3030;

const startServer = async () => {
  await connectDB(); // Connect to the database

  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });
};

startServer();

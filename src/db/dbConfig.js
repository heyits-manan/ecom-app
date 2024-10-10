require("dotenv").config();

import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to the database");
    });

    connection.on("error", (error) => {
      console.log("Error connecting to the database: ", error);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
}

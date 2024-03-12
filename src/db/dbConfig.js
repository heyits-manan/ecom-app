require("dotenv").config();

import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(
      // "mongodb+srv://chatautmanan:IEmoXdOF9smLZ8Cy@cluster0.tuyrl1c.mongodb.net/"
      process.env.MONGODB_URI
    );
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

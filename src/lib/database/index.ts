// Data base setup
import mongoose from "mongoose";
/* Global State: In Next.js, a new server instance is created for each request,
 and data is not persisted between requests by default. This means that if you 
 create a new Mongoose connection on each request, it will create a new connection 
 every time a request is made, which is inefficient and not recommended 
 Each invocation of a server less function results in a new connection to the Database 
 Each server actions we need to the connectToDb function again and again*/

//(global as any) is mentioned to say that we are referring to the global type of mongoose not the one we imported
// it is stored in global
let cached = (global as any).mongoose || { conn: null, promise: null };

const MONGODB_URI = process.env.MONGO_URI;

export const connectToDatabase = async () => {
  // connection reusing
  if (cached?.conn) {
    console.log("Using existing connection");
    return cached.conn;
  }

  if (!MONGODB_URI) throw new Error("MONGO URI is missing");

  cached.promise =
    cached?.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "Evently",
      // mongoDb won't wait
      bufferCommands: false,
    });
  console.log("New connection created");

  cached.conn = await cached.promise;
  return cached.conn;
};

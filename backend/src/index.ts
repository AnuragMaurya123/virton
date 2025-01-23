import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/mongodb';
import adminRouter from './routers/admin.router';
import partnersRouter from './routers/parnters.router';
import promotersRouter from './routers/promoter.router';
import cookieParser from "cookie-parser";


// Load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());


// CORS configuration
app.use(
  cors({
    origin: [
      process.env.FRONTEND as string
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// API route for "from" resource
app.use("/api/admin",adminRouter)
app.use("/api/partners",partnersRouter)
app.use("/api/promoters",promotersRouter)


// Test Endpoint
app.get("/", (req:Request, res:Response) => {
  res.send("API is Working");
});

// Start the server after successfully connecting to the database
connectDB()
  .then(() => {
    app.listen(process.env.PORT ?? 5000, () => {
      console.log(`API is working on port: ${process.env.PORT ?? 5000}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });


  // Export the app for Vercel
export default app;
import express, { Router } from "express";
import cors from "cors";
import { routes } from "./routes";

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Create a Router instance and pass it to the `routes` function

const router = Router();
routes(router); // Pass the Router instance to routes

app.use(router); // Register the router with the express app

app.listen(port, () => {
  console.log("listening on " + port);
});

import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express();

app.use(cors(), express.json());
app.use("/api/v1/restaurants", restaurants);
app.use("*", (req, res) => res.status(404).json({ error: "NOT FOUND" }));

export default app;

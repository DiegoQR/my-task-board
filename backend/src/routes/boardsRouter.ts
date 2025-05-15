import express from "express";
import { Router } from "express-serve-static-core";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("GET request to /api/boards");
    res.json({ message: "Hello from boards router!" });
});

export default (app: { use: (arg0: string, arg1: Router) => any; }) => app.use("/api/boards", router);
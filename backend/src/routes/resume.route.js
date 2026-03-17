import express from "express";
import {sendMessage } from "../controller/resume.controller.js"

const router = express.Router();




router.post("/ai",sendMessage) 

export default router;

import express from "express";
import documentController from "../controllers/document.controller";

const router = express.Router();

router.post('/', documentController.createEmbedding)

export default router;

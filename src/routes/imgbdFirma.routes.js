import { Router } from "express";
import {
  createFirma,
  deleteFirmas,
  getFirma,
  getFirmas,
  updateFirma,
} from "../controllers/imgbdFirmas.controller.js";

const router = Router();

// GET all firmas
router.get("/firmaUrl", getFirmas);

// GET An Firma
router.get("/firmaUrl/:id", getFirma);

// DELETE An firmas
router.delete("/firmaUrl/:id", deleteFirmas);

// INSERT An firmas
router.post("/firmaUrl", createFirma);

router.patch("/firmaUrl/:id", updateFirma);

export default router;

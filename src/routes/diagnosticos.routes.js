import { Router } from "express";
import {
  createDiagnostico,
  deleteDiagnosticos,
  getDiagnostico,
  getDiagnosticos,
  updateDiagnostico,
} from "../controllers/diagnosticos.controller.js";

const router = Router();

// GET all diagnosticos
router.get("/diagnosticos", getDiagnosticos);

// GET An diagnosticos
router.get("/diagnosticos/:id", getDiagnostico);

// DELETE An diagnosticos
router.delete("/diagnosticos/:id", deleteDiagnosticos);

// INSERT An diagnosticos
router.post("/diagnosticos", createDiagnostico);

router.patch("/diagnosticos/:id", updateDiagnostico);

export default router;

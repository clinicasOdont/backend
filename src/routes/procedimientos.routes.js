import { Router } from "express";
import {
  createProcedimiento,
  deleteProcedimientos,
  getProcedimiento,
  getProcedimientos,
  updateProcedimiento,
} from "../controllers/procedimientos.controller.js";

const router = Router();

// GET all procedimientos
router.get("/procedimientos", getProcedimientos);

// GET An procedimientos
router.get("/procedimientos/:id", getProcedimiento);

// DELETE An procedimientos
router.delete("/procedimientos/:id", deleteProcedimientos);

// INSERT An procedimientos
router.post("/procedimientos", createProcedimiento);

router.patch("/procedimientos/:id", updateProcedimiento);

export default router;

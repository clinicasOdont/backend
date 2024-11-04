import { Router } from "express";
import {
  createEvolucion,
  deleteEvoluciones,
  getEvolucion,
  getEvoluciones,
  updateEvolucion,
} from "../controllers/evoluciones.controller.js";

const router = Router();

// GET all evoluciones
router.get("/evoluciones", getEvoluciones);

// GET An evoluciones
router.get("/evoluciones/:id", getEvolucion);

// DELETE An evoluciones
router.delete("/evoluciones/:id", deleteEvoluciones);

// INSERT An evoluciones
router.post("/evoluciones", createEvolucion);

router.patch("/evoluciones/:id", updateEvolucion);

export default router;

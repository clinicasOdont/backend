import { Router } from "express";
import {
  createOdontograma,
  deleteOdontogramas,
  getOdontograma,
  getOdontogramas,
  updateOdontograma,
} from "../controllers/imgbdOdontograma.controller.js";

const router = Router();

// GET all Odontogramas
router.get("/odontogramaUrl", getOdontogramas);

// GET An Odontogramas
router.get("/odontogramaUrl/:id", getOdontograma);

// DELETE An Odontogramas
router.delete("/odontogramaUrl/:id", deleteOdontogramas);

// INSERT An Odontogramas
router.post("/odontogramaUrl", createOdontograma);

router.patch("/odontogramaUrl/:id", updateOdontograma);

export default router;

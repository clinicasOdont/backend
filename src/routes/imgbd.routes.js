import { Router } from "express";
import {
  createImagen,
  deleteReferencias,
  getOdontograma,
  getReferencias,
  updateReferencia,
} from "../controllers/imgbd.controller.js";

const router = Router();

// GET all referencias
router.get("/referencias", getReferencias);

// GET An referencias
router.get("/imgbd/:id", getOdontograma);

// DELETE An referencias
router.delete("/referencias/:id", deleteReferencias);

// INSERT An referencias
router.post("/imgbd", createImagen);

router.patch("/referencias/:id", updateReferencia);

export default router;

import { Router } from "express";
import {
  getPlanilla,
  getPlanillas,
} from "../controllers/reportes.controller.js";

const router = Router();

// GET all reportes
router.get("/reportes", getPlanillas);

// GET An reportes
router.get("/reportes/:id", getPlanilla);



export default router;

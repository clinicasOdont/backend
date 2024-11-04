import { Router } from "express";
import {
  createConsentimiento,
  deleteConsentimientos,
  getConsentimiento,
  getConsentimientos,
  updateConsentimiento,
} from "../controllers/consentimientos.controller.js";

const router = Router();

// GET all Consentimientos
router.get("/consentimientos", getConsentimientos);

// GET An Consentimientos
router.get("/consentimientos/:id", getConsentimiento);

// DELETE An Consentimientos
router.delete("/consentimientos/:id", deleteConsentimientos);

// INSERT An Consentimientos
router.post("/consentimientos", createConsentimiento);

router.patch("/consentimientos/:id", updateConsentimiento);

export default router;

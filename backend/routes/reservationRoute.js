import express from "express";
import send_reservation from "../controllers/reservation.js";
import  isAuthenticated  from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/send", isAuthenticated,send_reservation);

export default router;
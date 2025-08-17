import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//import { errorMiddleware } from "./error.js";
import cookieParser from "cookie-parser";
import reservationRouter from "./routes/reservationRoute.js";
import authRoute from "./routes/authRoute.js"; // ✅ added
import { dbConnection } from "./database/dbConnection.js";


const app = express();
dotenv.config({ path: "./.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ updated
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/user", authRoute); // ✅ added

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN",
  });
});

dbConnection();

//app.use(errorMiddleware);

export default app;

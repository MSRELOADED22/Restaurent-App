import ErrorHandler from "../middleware/error.js";
import { Reservation } from "../models/reservation.js";
import { sendReservationEmail } from "../utils/emailService.js"; // ✅ Email service imported

const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    const reservation = await Reservation.create({
      firstName,
      lastName,
      email,
      date,
      time,
      phone,
    });

    // ✅ Send confirmation email
    try {
      await sendReservationEmail(email, {
        firstName,
        lastName,
        date,
        time,
      });
    } catch (emailErr) {
      console.error("❌ Email sending failed:", emailErr.message);
      // Optionally: You could return a warning message about email failure
    }

    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    return next(error);
  }
};

export default send_reservation;

// utils/emailService.js
import nodemailer from "nodemailer";

export const sendReservationEmail = async (email, reservationDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_GMAIL_USER,
      pass: process.env.SMTP_GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"The Restaurant" <${process.env.SMTP_GMAIL_USER}>`,
    to: email,
    subject: "Your Table Reservation is Confirmed!",
    text: `Hi ${reservationDetails.firstName} ${reservationDetails.lastName},

Your table has been successfully reserved for ${reservationDetails.date} at ${reservationDetails.time}.

Thank you for choosing our restaurant!`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

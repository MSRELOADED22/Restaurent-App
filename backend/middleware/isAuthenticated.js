import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Verify token using your secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the user ID to the request object for use in controllers
    req.user = decoded.userId;

    next(); // Proceed to the next middleware or route
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

export default isAuthenticated;

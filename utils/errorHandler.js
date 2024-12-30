// utils/errorResponse.js
export class ErrorResponse extends Error {
  constructor(message, statusCode, errorCode = null) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

// Common error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  AUTHENTICATION_ERROR: "AUTH_ERROR",
  NOT_FOUND: "NOT_FOUND",
  ASSESSMENT_ERROR: "ASSESSMENT_ERROR",
  DATABASE_ERROR: "DB_ERROR",
  RATE_LIMIT_ERROR: "RATE_LIMIT_ERROR",
  BUSINESS_LOGIC_ERROR: "BUSINESS_ERROR",
};

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error("Error stack:", err.stack);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404, ERROR_CODES.NOT_FOUND);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400, ERROR_CODES.VALIDATION_ERROR);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400, ERROR_CODES.VALIDATION_ERROR);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token";
    error = new ErrorResponse(message, 401, ERROR_CODES.AUTHENTICATION_ERROR);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired";
    error = new ErrorResponse(message, 401, ERROR_CODES.AUTHENTICATION_ERROR);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || "Server Error",
      code: error.errorCode || ERROR_CODES.DATABASE_ERROR,
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
        details: err.details || null,
      }),
    },
  });
};

 

// utils/asyncHandler.js
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);


import ApiError from "../utils/ApiError.js";

export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 500,
    message: "Internal Server Error",
  });
};

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res, next, options) => {
    const error = new Error("Too many requests, please try again later");
    error.status = 429;
    next(error);
  },
});

export default limiter;

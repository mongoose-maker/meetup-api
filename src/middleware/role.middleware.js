module.exports = (req, res, next) => {
  if (req.user && req.user.role === "organizer") {
    return next(); // доступ разрешён
  }
  return res.status(403).json({ message: "Требуются права организатора" });
};

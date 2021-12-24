module.exports = function checkFalcuty(req, res, next) {
  let authorize = req.data.authorize;
  if (authorize !== 2) res.status(403).json("You have not permission");
  next();
}
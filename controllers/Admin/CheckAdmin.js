module.exports = function checkAdmin(req, res, next) {
    if (req.data.authorize !== 1) res.status(403).json("You have not permission");
    next();
}
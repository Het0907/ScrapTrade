const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

// Role guard
module.exports.requireRole = function(requiredRoles = []) {
  return function(req, res, next) {
    const role = req.user?.role;
    if (!role || !requiredRoles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  }
}
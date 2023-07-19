const jwt = require('jsonwebtoken');

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log(req.headers);
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Missing token' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
    if (error) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = {
  authenticateToken
};
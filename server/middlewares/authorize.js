const { verifyToken } = require('../utils/jwtBcryptMethods');

const authorize = (req, res, next) => {
  try {
    const authHeader = req.get('authorization')?.split(' ')[1];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    const account = verifyToken(authHeader);

    if (!account || !account.role) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    if (account.role === 'USER') {
      req.user = account;
    } else if (account.role === 'ADMIN') {
      req.admin = account;
    } else {
      return res.status(403).json({ message: 'Role not recognized' });
    }

    next();
  } catch (err) {
    console.log('Auth error:', err);
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authorize;

/**
 * Middleware to restrict access to admin users only
 * Should be used after authMiddleware
 */
const adminMiddleware = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. Admin privileges required.' 
    });
  }
  next();
};

export default adminMiddleware;

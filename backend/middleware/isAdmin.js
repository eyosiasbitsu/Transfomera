
const isAdmin = (req, res, next) => {
  const userRole = req.user.role;
  
  if (userRole !== 'Admin') {
    return res.status(403).json({ message: 'Not authorized as an admin' });
  }
  next();
};

module.exports = isAdmin;
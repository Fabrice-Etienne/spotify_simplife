const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Vérification de la présence du header Authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: 'Accès refusé. Token manquant ou format invalide (Bearer TOKEN_ICI).' 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // On stocke les infos du user dans l'objet req
    next();
  } catch (err) {
    return res.status(403).json({ 
      message: 'Token invalide ou expiré.',
      error: err.message 
    });
  }
};
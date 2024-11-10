const User = require('../api/models/User');
const { validateToken } = require('../utils/token/token');

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json('Unauthorized: No token found. Did you log in?');
    }

    try {
        const decoded = validateToken(token);
        //"select("-password") me permite seleccionar todo el usuario excluyendo la contraseña.
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json('Unauthorized: Not a valid token');
    }
};

module.exports = { isAuth };

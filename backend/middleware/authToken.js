const jwt = require('jsonwebtoken');
const userSchema = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;
exports.isAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }

        const user = await userSchema.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('error', err.message);
        res.status(500).json({ msg: 'Server Error',err });
    }
};


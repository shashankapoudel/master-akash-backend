const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/ApiError');

// Dummy admin check, in real app you'd fetch user from DB
const isAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ApiError(401, 'Not authorized, token missing');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            throw new ApiError(403, 'Not authorized as admin');
        }

        req.user = decoded; // decoded should contain { id, email, isAdmin }
        next();
    } catch (error) {
        throw new ApiError(401, 'Not authorized, token failed');
    }
};

module.exports = isAdmin;

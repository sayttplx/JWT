const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware protection to routes
module.exports = (req, res, next) => {
    // Check for the token in the headers
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized, Access Denied' });
    }

    // We know that the token exists in the header now check if its valid
    try {
        // We get the token from the header and decode it and verifys it
        const decodedToken = jwt.verify(authHeader, config.get('JWT_SECRET'));
        
        req.userId = decodedToken.user._id

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized, Access Denied' });
    }
}
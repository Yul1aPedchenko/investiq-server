import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        const [, token] = authHeader.split(' ');

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({message: 'Invalid token'});
    }
}
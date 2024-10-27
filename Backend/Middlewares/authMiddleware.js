import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {


    const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
 // Verify token
        req.userId = verified.userId; // Attach userId to request object
        next(); // Proceed to the next middleware
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid token.',
            success: false
        });
    }
};

export default authMiddleware;

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: "Access Denied: You do not have Admin permissions"
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Admin Middleware",
            error: err.message
        });
    }
};
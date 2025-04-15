// const Token = require("../models/Token");

// const authMiddleware = async (req, res, next) => {
//     const tokenString = req.headers.token;

//     if (!tokenString) {
//         return res.status(401).json({ message: "Token not provided" });
//     }

//     try {
//         const tokenDoc = await Token.findOne({ token: tokenString }).populate("userId");

//         if (!tokenDoc) {
//             return res.status(401).json({ message: "Invalid token" });
//         }

//         req.user = tokenDoc.userId;
//         next();
//     } catch (err) {
//         res.status(500).json({ message: "Internal error", error: err });
//     }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};

module.exports = verifyToken;

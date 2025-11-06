import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
    console.log(process.env.SUPER_TOKEN_SECRET);
    const token = jwt.sign({ userId }, process.env.SUPER_TOKEN_SECRET, {
        expiresIn: "7d"
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    });
    return token;
};
//# sourceMappingURL=generateToken.js.map
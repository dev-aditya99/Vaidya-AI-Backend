import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    try {
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15d" }
        );

        res.cookie("uuid", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development"
        });

        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};

export default generateTokenAndSetCookie;

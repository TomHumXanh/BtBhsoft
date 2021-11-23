import jwt from "jsonwebtoken";

const signToken = function(data) {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

export default signToken ;
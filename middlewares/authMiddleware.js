import { verifyJWT } from "../utils/jwt.js";
import { UnauthorizedError } from "../errors/customError.js";
import { BadRequestError } from "../errors/customError.js";
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new UnauthorizedError("Unauthorized");
        const {userId, role} = verifyJWT(token);
        console.log(userId);
        const testUser = userId === '68833f876673b4ddec66fe45';
        req.user = {userId, role, testUser};
        next();
    } catch (error) {
        throw new UnauthorizedError("Unauthorized");
    }
}

export const adminMiddleware = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        throw new UnauthorizedError("Unauthorized");
    }
    next();
}
export const checkForTestUser = async (req, res, next) => {
    console.log(req.user);
    try {
        if (req.user.testUser) {
            throw new BadRequestError('Demo User. Read Only!');
          }
          next();
    } catch (error) {
        throw new UnauthorizedError("Unauthorized");
    }
}
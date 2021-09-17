const jwt = require('jsonwebtoken');
const HttpException = require('../utils/HttpExceptionUtils');
const schoolModel = require('../models/school');

const auth = (...roles) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT || "";

            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            const school = await schoolModel.findOne({ _id: decoded.school_id });

            if (!school) {
                throw new HttpException(401, 'Authentication failed!');
            }

            // check if the current user is the owner user
            const ownerAuthorized = req.params.id == school._id;

            // if the current school is not the owner and
            // if the school role don't have the permission to do this action.
            // the school will get this error
            if (!ownerAuthorized && roles.length && !roles.includes(school.role)) {
                throw new HttpException(401, 'Unauthorized');
            }

            // if the school has permissions
            req.currentSchool = school;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = auth;
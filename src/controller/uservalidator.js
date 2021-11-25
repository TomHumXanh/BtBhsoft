import {body, check, validationResult} from "express-validator";

export const userValidator = [
    check("username")
        .isEmpty()
        .isLength(6)
        .withMessage("Username is require"),
    check('password')
        .isEmpty()
        .isLength({min: 8})
        .isStrongPassword({minLowercase: 1, minUppercase:1, minNumbers: 1})
        .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
    check('email')
        .isEmpty()
        .isEmail()
        .withMessage("Email is require"),


];
export const validatorResult = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).send({
        statusCode: 400,
        message: errors.array()[0].msg,
        data: {},
      });
    }
    return next();
  };
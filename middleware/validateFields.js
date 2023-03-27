import { response } from 'express';
import { validationResult } from 'express-validator';

const validateFields = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }
    next();
}

export default validateFields;
import { Request, Response } from 'express';
import Joi, { Schema } from 'joi';

export default function validateSchema(schema: Schema) {
    return (req: Request, res: Response, next: Function) => {
        const {error} = schema.validate(req.body, {abortEarly: false});

        if (error) {
            return res.status(422).send(error.details.map(detail => detail.message))
        }

        next();
    }
}
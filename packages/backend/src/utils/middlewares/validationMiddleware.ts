import express from "express";
import joi from "joi";
import boom from "@hapi/boom";


function validate(data: unknown, schema: any) {
	const { error } = joi.object(schema).validate(data);
	return error;
}


// @param {Object} validationSchema - { [K in "body" | "query" | "params"] : joiSchema }
function createValidationMiddleware(validationSchema: any) {
    const [[ payloadKey, joiSchema ]] = Object.entries(validationSchema);

    if(payloadKey !== 'body' && payloadKey !== 'query' && payloadKey !== 'params') {
        throw new Error('Invalid payload key must be one of "body", "query" or "params"');
    }

    return function validationMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        const error = validate(req[payloadKey], joiSchema);
        error ? next(boom.badRequest(error)) : next();
    }
}

export default createValidationMiddleware;
import express from "express";
import boom from "@hapi/boom";
import config from "../../config/config";

function withErrorStack(error:any, stack:any, _isStackShown = config.dev) {
    if(_isStackShown) {
        return {...error, stack};
    }
    return error
}

function logErrors(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    console.error(err);
    next(err);
}

function wrapErrors(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    if(!err.isBoom) {
        next(boom.badImplementation(err));
    }
    next(err);
}

function errorHandler(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    const { stack, output } = err;
    res.status(output.statusCode);
    res.json(withErrorStack(output.payload, stack))
}

function notFoundMiddleware(req: express.Request, res: express.Response) {
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

export {
    logErrors,
    wrapErrors,
    errorHandler,
    notFoundMiddleware
}
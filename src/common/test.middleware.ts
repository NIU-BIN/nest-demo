import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Test Middleware", req.baseUrl, req.method);
    next();
  }
}
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return next();

    try {
      const decoded = jwt.verify(
        token,
        'c79c44cbbd7e8bd432d318abbc51d01a28787a6d44300373ab5682de21b0dc6e',
      );
      console.log('Decoded JWT:', decoded);

      req.user = decoded;
      next();
    } catch (err) {
      console.error('Error decoding JWT', err);
      next();
    }
  }
}

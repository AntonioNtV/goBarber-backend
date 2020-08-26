import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, auth.jwt.secret) as TokenPayload;

        const { sub } = decoded;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new Error('Invalid JWT token');
    }
}

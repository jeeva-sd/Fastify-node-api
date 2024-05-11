import * as jwt from 'jsonwebtoken';
import { ReplayX, RequestX } from '~/server';
import { MiddlewareFunction, take } from '~/modules/shared';
import { appConfig } from '~/config';
import { TokenData } from './auth.type';

export const tokenAuth: MiddlewareFunction = async (req: RequestX, res: ReplayX) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send(take(401));
        }

        const decodedToken = jwt.verify(token, appConfig.jwt.accessSecretKey) as TokenData;
        if (!decodedToken) {
            return res.status(401).send(take(401));
        }

        req.tokenData = {
            userId: decodedToken.userId,
            roleId: decodedToken.roleId,
        };
    } catch (error) {
        res.status(401).send(take(401));
    }
};

export const adminAuth: MiddlewareFunction = async (req: RequestX, res: ReplayX) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).send(take(401));
        }

        const decodedToken = jwt.verify(token, appConfig.jwt.accessSecretKey) as TokenData;
        if (!decodedToken) {
            return res.status(401).send(take(401));
        }

        if (![appConfig.role.admin, appConfig.role.superAdmin].includes(decodedToken.roleId)) {
            return res.status(403).send(take(403));
        }
    } catch (error) {
        res.status(401).send(take(401));
    }
};

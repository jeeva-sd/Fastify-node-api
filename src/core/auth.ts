import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable, Exception, TokenData, take } from '~/server';
import { AuthRepository } from '~/database';
import { appConfig } from '~/config';
import { LoginPayload, ResetPasswordPayload } from '~/rules';

@Injectable()
class AuthCore {
    constructor(private authRepository: AuthRepository) { }

    public async login(payload: LoginPayload) {
        const user = await this.authRepository.findUserByEmail(payload.email);
        if (!user) throw new Exception(401);

        const passwordMatch = await bcrypt.compare(payload.password, user.password);
        if (!passwordMatch) throw new Exception(1050);

        const tokenData: TokenData = {
            userId: user.id,
            roleId: user.roleId,
        };

        const token = jwt.sign(
            tokenData, appConfig.jwt.accessSecretKey,
            { expiresIn: appConfig.jwt.accessExpirationDays }
        );

        const response = {
            userId: user.id,
            name: user.name,
            email: user.email,
            roleId: user.roleId,
            createdAt: user.createdAt,
            token
        };

        return take(1051, response);
    }

    public async resetPassword(payload: ResetPasswordPayload, tokenData: TokenData) {
        const user = await this.authRepository.findUserById(tokenData.userId);
        if (!user) throw new Exception(1055);

        const passwordMatch = await bcrypt.compare(payload.password, user.password);
        if (!passwordMatch) throw new Exception(401);

        const newPassword = await bcrypt.hash(payload.newPassword, appConfig.bcrypt.saltRounds);
        await this.authRepository.resetUserPassword({
            userId: tokenData.userId, newPassword
        });

        return take(1056);
    }
}

export { AuthCore };
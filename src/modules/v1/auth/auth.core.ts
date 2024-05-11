import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ResponseX, Exception, take } from '~/server';
import { appConfig } from '~/config';
import { AuthRepository } from './auth.repository';
import { LoginPayload, ResetPasswordPayload, TokenData } from './auth.type';

class AuthCore {
    private authRepository: AuthRepository;

    public async login(payload: LoginPayload): Promise<ResponseX> {
        const user = await this.repoInstance().findUserByEmail(payload.email);
        if (!user) throw new Exception(401);

        const passwordMatch = await bcrypt.compare(payload.password, user.password);
        if (!passwordMatch) return take(1050);

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

    public async resetPassword(payload: ResetPasswordPayload, tokenData: TokenData): Promise<ResponseX> {
        const user = await this.repoInstance().findUserById(tokenData.userId);
        if (!user) throw new Exception(1055);

        const passwordMatch = await bcrypt.compare(payload.password, user.password);
        if (!passwordMatch) return take(1050);

        const newPassword = await bcrypt.hash(payload.newPassword, appConfig.bcrypt.saltRounds);
        await this.repoInstance().resetUserPassword({
            userId: tokenData.userId, newPassword
        });

        return take(1056);
    }

    private repoInstance(): AuthRepository {
        if (!this.authRepository) this.authRepository = new AuthRepository();
        return this.authRepository;
    }
}

export { AuthCore };
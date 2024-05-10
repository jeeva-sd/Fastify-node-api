import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ResponseX } from '~/server';
import { CoreGuard, repoError, take } from '~/api/shared';
import { appConfig } from '~/config';
import { LoginPayload, ResetPasswordPayload, TokenData } from './entities/type';
import { AuthRepository } from './auth.repository';

class AuthCore {
    private authRepository: AuthRepository;

    @CoreGuard
    public async login(payload: LoginPayload): Promise<ResponseX> {
        const user = await this.repoInstance().findUserByEmail(payload.email);
        if (!user.data) return take(1050);

        const passwordMatch = await bcrypt.compare(payload.password, user.data.password);
        if (!passwordMatch) return take(1050);

        const tokenData: TokenData = {
            userId: user.data.id,
            roleId: user.data.roleId,
        };

        const token = jwt.sign(
            tokenData, appConfig.jwt.accessSecretKey,
            { expiresIn: appConfig.jwt.accessExpirationDays }
        );

        const response = {
            userId: user.data.id,
            name: user.data.name,
            email: user.data.email,
            roleId: user.data.roleId,
            createdAt: user.data.createdAt,
            token
        };

        return take(1051, response);
    }

    @CoreGuard
    public async resetPassword(payload: ResetPasswordPayload, tokenData: TokenData): Promise<ResponseX> {
        const user = await this.repoInstance().findUserById(tokenData.userId);
        if (!user.data) return take(1055);

        const passwordMatch = await bcrypt.compare(payload.password, user.data.password);
        if (!passwordMatch) return take(1050);

        const newPassword = await bcrypt.hash(payload.newPassword, appConfig.bcrypt.saltRounds);
        const resetPasswordResult = await this.repoInstance().resetUserPassword({
            userId: tokenData.userId, newPassword
        });

        if (!resetPasswordResult.success) return repoError(resetPasswordResult);
        return take(1056);
    }

    private repoInstance(): AuthRepository {
        if (!this.authRepository) this.authRepository = new AuthRepository();
        return this.authRepository;
    }
}

export { AuthCore };
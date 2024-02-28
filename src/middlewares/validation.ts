import * as yup from 'yup';
import { ReplayX, RequestX, clientError } from '~/utils';
import { appConfig } from '~/config';

export const validateParams = (schema: yup.AnyObjectSchema) => {
    return async (req: RequestX, reply: ReplayX): Promise<void> => {
        try {
            const params = {
                ...(typeof req.body === 'object' ? req.body : {}),
                ...(typeof req.params === 'object' ? req.params : {}),
                ...(typeof req.query === 'object' ? req.query : {})
            };

            const abortEarly = appConfig.validation.abortEarly;
            const validatedParams = await schema.validate(params, { abortEarly });

            req.parameters = { ...validatedParams, ...req.parameters };
        } catch (error) {
            reply.status(400).send(clientError(error));
            return;
        }
    };
};

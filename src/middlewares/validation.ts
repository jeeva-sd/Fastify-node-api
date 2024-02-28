// import { NextFunction, Response } from 'express';
// import * as yup from 'yup';
// import { RequestX, clientError } from '~/utils';
// import { appConfig } from '~/config';
// import { MiddlewareFunction } from './types';

// export const validateParams = (schema: yup.AnyObjectSchema): MiddlewareFunction => {
//     return async (req: RequestX, res: Response, next: NextFunction): Promise<void> => {
//         try {
//             const params = { ...req.body, ...req.params, ...req.query, ...req.parameters };
//             const validatedParams = await schema.validate(params, {
//                 abortEarly: appConfig.validation.abortEarly
//             });

//             req.parameters = { ...validatedParams, ...req.parameters };
//             next();
//         } catch (error) {
//             res.status(400).send(clientError(error));
//         }
//     };
// };
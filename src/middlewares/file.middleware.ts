import * as fs from 'fs';
import * as path from 'path';
import * as yup from 'yup';
import { MiddlewareFunction, ReplayX, RequestX, clientError } from '~/server';
import { extractError, generateFilename } from '~/helpers';
import { imageRule } from '~/rules';

export const fileGuard = (schema: yup.AnySchema = imageRule, fieldName?: string): MiddlewareFunction => {
    return async (req: RequestX, res: ReplayX) => {
        try {
            let formData: Record<string, string> = {};
            if (!req.isMultipart()) return res.code(400).send(clientError());
            const parts: any = await req.parts();

            for await (const part of parts) {
                if (part.file) {
                    await schema.validate({
                        filename: part.filename,
                        mimetype: part.mimetype,
                        size: part.file.bytesRead
                    });

                    const uploadDir = path.join('public/uploads');
                    const filename = generateFilename(part.filename);
                    const filePath = path.join(uploadDir, filename);

                    await fs.promises.mkdir(uploadDir, { recursive: true });
                    await fs.promises.writeFile(filePath, part.file);
                    formData = { ...formData, [part.fieldname]: `/public/uploads/${filename}` };
                }
                else {
                    formData = { ...formData, [part.fieldname]: part.value };
                }
            }

            req.formData = formData;
        } catch (error) {
            console.error('FILE VALIDATION ERROR:', extractError(error));
            res.status(400).send(clientError(error));
        }
    };
};
import * as fs from 'fs';
import * as path from 'path';
import * as yup from 'yup';
import { MiddlewareFunction, ReplayX, RequestX, clientError, take } from '~/server';
import { generateFilename } from '~/helpers';

interface FileValidationOptions {
    schema: yup.AnySchema;
    fieldName: string;
}

export const imageSchema = yup.object().shape({
    filename: yup.string().required(),
    mimetype: yup.string().oneOf(['image/jpeg'], 'Invalid image format').required(),
    size: yup.number().min(1).max(307200, 'File size should be less than 300KB').required(),
});

export const fileValidation = (options: FileValidationOptions): MiddlewareFunction => {
    return async (req: RequestX, res: ReplayX) => {
        try {
            let formData: Record<string, string> = {};
            if (!req.isMultipart()) res.code(400).send(take(400));
            const parts: any = await req.parts();

            for await (const part of parts) {
                if (part.file) {

                    await options.schema.validate({
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
            console.error('Error during file validation:', error);
            res.status(400).send(clientError(error));
        }
    };
};
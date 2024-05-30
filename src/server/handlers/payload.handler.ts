import * as fs from 'fs';
import * as yup from 'yup';
import { ReplayX, RequestX } from '~/server';
import { appConfig } from '~/config';
import { clientError } from './response.handler';

export const validatePayload = (schema: yup.AnyObjectSchema) => {
    return async (req: RequestX, reply: ReplayX): Promise<void> => {
        try {
            let formData = {};

            if (req.isMultipart()) {
                const parts: any = await req.parts();
                for await (const part of parts) {
                    if (part.file) {
                        // Read the file content from the FileStream
                        const { buffer, type } = await readFileBuffer(part.file);
                        if (type === 'unknown') throw new Error('Invalid file content');

                        const fileSize = buffer.length;
                        formData = {
                            ...formData,
                            [part.fieldname]: {
                                fileSize,
                                fileType: type,
                                fileBuffer: buffer,
                            }
                        };
                    } else {
                        formData = { ...formData, [part.fieldname]: part.value };
                    }
                }
            }

            const params = {
                ...(typeof req.body === 'object' ? req.body : {}),
                ...(typeof req.params === 'object' ? req.params : {}),
                ...(typeof req.query === 'object' ? req.query : {}),
                ...(typeof req.formData === 'object' ? req.formData : {}),
                ...formData
            };

            const validatedParams = await schema.validate(params, appConfig.validation);
            req.payload = { ...validatedParams };
            req.sanitized = true;
        } catch (error) {
            return reply.status(400).send(clientError(error));
        }
    };
};

// Helper function to read file buffer and type
const readFileBuffer = async (stream: fs.ReadStream): Promise<{ buffer: Buffer, type: string; }> => {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        let fileType: string = '';
        stream.on('data', (chunk) => {
            chunks.push(chunk);
            // Detect file type by inspecting initial bytes of the file
            if (!fileType && Buffer.isBuffer(chunk)) {
                fileType = detectFileType(chunk);
            }
        });
        stream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            resolve({ buffer, type: fileType });
        });
        stream.on('error', (error) => reject(error));
    });
};

const detectFileType = (buffer: Buffer): string => {
    // Check if the buffer is large enough to contain magic numbers
    if (buffer.length < 4) {
        return 'unknown';
    }

    // Define magic numbers for common file types
    const magicNumbers: { [key: string]: string; } = {
        'FFD8FFE0': 'image/jpeg',
        '89504E47': 'image/png',
        '47494638': 'image/gif',
        '25504446': 'application/pdf',
        '7B5C727466': 'application/rtf', // RTF files
        'D0CF11E0A1B11AE1': 'application/msword', // DOC files
        '377ABCAF271C': 'application/7z', // 7z files
        '504B0304': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX files
    };

    // Get the first 4 bytes of the buffer and convert them to hexadecimal
    const magicBytes = buffer.slice(0, 4).toString('hex').toUpperCase();

    // Check if any magic number matches
    for (const magicNumber in magicNumbers) {
        if (magicBytes.startsWith(magicNumber)) {
            return magicNumbers[magicNumber];
        }
    }

    return 'unknown';
};
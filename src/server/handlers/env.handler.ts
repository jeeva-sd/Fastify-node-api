import fs from 'fs';
import dotenv from 'dotenv';
import { Environment } from './type';

// Load environment variables from the corresponding .env file
const environment = process?.env?.NODE_ENV ? `.${process.env.NODE_ENV.trim()}.env` : '.env';

// Check if the file exists
if (fs.existsSync(environment)) {
    console.log(`Loading variables from ${environment}`);
    dotenv.config({ path: environment });
}
else console.log(`'${environment}' not found. Loading fallback...`);

const envs: Environment = { ...process?.env || {} };

// Define a conditional return type based on the type of fallback
type ReturnType<T> = T extends number ? number :
    T extends object ? any[] :
    T extends boolean ? boolean :
    T;

// Helper function to parse and return the value with fallback
const readEnv = <T>(name: string, fallback: T): ReturnType<T> => {
    const value = envs[name];

    try {
        if (typeof value === 'undefined') return fallback as ReturnType<T>;
        if (typeof fallback === 'number') {
            const parsedValue = parseInt(value);
            return (!isNaN(parsedValue) ? parsedValue : fallback) as ReturnType<T>;
        }
        if (typeof fallback === 'object') {
            const arr = value?.split(',').map(element => {
                if (element === 'true' || element === 'false') return element === 'true';
                else if (!isNaN(parseFloat(element))) return parseFloat(element);
                else return element;
            });

            return arr as ReturnType<T>;
        }
        if (typeof fallback === 'boolean') {
            if (value) {
                const configValue = (value === 'true' || value === '1') ? true : ((value === 'false' || value === '0') ? false : fallback);
                return configValue as ReturnType<T>;
            }

            return fallback as ReturnType<T>;
        }

        return value as ReturnType<T>;
    }
    catch (error) {
        console.log(`Error in reading ${name} env from ${environment}`);
        return fallback as ReturnType<T>;
    }
};

export { readEnv };
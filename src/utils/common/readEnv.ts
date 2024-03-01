import fs from 'fs';
import dotenv from 'dotenv';
import { Environment } from '~/config';

// Load environment variables from the corresponding .env file
const envs: Environment = { ...process?.env || {} };
const environment = process?.env?.NODE_ENV ? `.${process.env.NODE_ENV.trim()}.env` : '.env';

// Check if the file exists
if (fs.existsSync(environment)) {
    console.log(`Loading variables from ${environment}`);
    dotenv.config({ path: environment });
}
else console.log(`"${environment}" not found. Loading fallback...`);

// Helper function to parse and return the value with fallback
const readEnv = (name: string, fallback: any) => {
    const value = envs[name];

    try {
        if (typeof value === 'undefined') return fallback;
        if (typeof fallback === 'number') return parseInt(value) ? parseInt(value) : fallback;
        if (typeof fallback === 'object') return JSON.parse(value) ?? fallback;
        if (typeof fallback === 'boolean') return (value === 'true' || value === '1') ? value : fallback;

        return value;
    }
    catch (error) {
        console.log(`Error in reading ${name} env from ${environment}`);
        return fallback;
    }
};

export { readEnv };
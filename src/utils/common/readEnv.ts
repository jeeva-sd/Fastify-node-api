import fs from 'fs';
import dotenv from 'dotenv';
import { Environment } from '~/config';

// Load environment variables from the corresponding .env file
const environment = process?.env?.NODE_ENV ? `.${process.env.NODE_ENV.trim()}.env` : '.env';
// Check if the file exists
if (fs.existsSync(environment)) {
    console.log(`Loading variables from ${environment}`);
    dotenv.config({ path: environment });
}
else if (fs.existsSync('.env')) {
    console.log(`Environment file "${environment}" not found.`);
    console.log('Using .env');
    dotenv.config({ path: '.env' });
}
else {
    console.log(`No env files. Loading fallback...`);
}

// Parse the environment variables
const env: Environment = { ...process?.env || {} };

// Helper function to parse and return the value with fallback
const readEnv = (name: string, fallback: any) => {
    const value = env[name];

    if (typeof value === 'undefined') return fallback;
    if (typeof fallback === 'number') return parseInt(value) ? parseInt(value) : fallback;
    if (typeof fallback === 'boolean') return (value === 'true' || value === '1') ? value : fallback;

    return value;
};

export { readEnv };
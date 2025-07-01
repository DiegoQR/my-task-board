import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const {
    BACKEND_PORT,
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD,
    NODE_ENV

} = process.env;

const config = {
    dev: NODE_ENV !== 'production',
    port: Number(BACKEND_PORT)  || 3000,
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
};

export default config;

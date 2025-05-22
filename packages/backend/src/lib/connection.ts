require('dotenv').config();
import config from '../config/config';
import debug from 'debug';
import { Pool } from 'pg';

const log = debug('app:db');

const pool = new Pool({
   host: config.host,
   database: config.database,
   user: config.username,
   password: config.password,
   port: 5432,
   ssl: true,
});

pool.on('connect', () => {
  log('PostgreSQL connected');
});

pool.on('error', (err) => {
  log('PostgreSQL error', err);
});

export default pool;

import pg from 'pg';
import 'dotenv/config';
import { PoolConfig } from 'pg';

const { Pool } = pg;

const {password, host, user, port_db, database, MODE} = process.env;

let databaseConfig: object = {};

if (MODE === 'PROD') {
    databaseConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };
}

if (MODE === 'DEV') {
    databaseConfig = {
        user,
        password,
        host,
        port_db,
        database
    };
}

const db = new Pool(databaseConfig);

export default db;

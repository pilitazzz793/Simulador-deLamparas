import pkg from 'pg';
const { Pool} =pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

//conexion a la db
pool.query('SELECT 1')
.then(() => console.log('conectado a la db'))
.catch((err => console.error('error al conectarse a la db', err)));

console.log("DB:", process.env.DB_NAME);

export default pool;
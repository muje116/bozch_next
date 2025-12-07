const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

async function initDb() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        multipleStatements: true
    });

    const dbName = process.env.DB_NAME || 'bozch_cms';

    try {
        console.log(`Creating database ${dbName} if it doesn't exist...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        await connection.query(`USE \`${dbName}\``);

        console.log('Running migration scripts...');

        const scriptsDir = __dirname;
        const files = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.sql')).sort();

        for (const file of files) {
            console.log(`Executing ${file}...`);
            const sql = fs.readFileSync(path.join(scriptsDir, file), 'utf8');

            try {
                await connection.query(sql);
                console.log(`Successfully executed ${file}`);
            } catch (err) {
                console.error(`Error executing ${file}:`, err.message);
            }
        }

        console.log('Database initialization complete!');
    } catch (error) {
        console.error('Database initialization failed:', error);
    } finally {
        await connection.end();
    }
}

initDb();

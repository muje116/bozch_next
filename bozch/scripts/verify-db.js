const mysql = require('mysql2/promise');
require('dotenv').config();

async function verify() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'bozch_cms',
        });

        console.log('Connected to database.');

        const [users] = await connection.execute('SELECT * FROM admin_users');
        console.log('Admin Users:', users.length);
        if (users.length > 0) {
            console.log('First user:', users[0].email);
        }

        const [slides] = await connection.execute('SELECT * FROM hero_slides');
        console.log('Hero Slides:', slides.length);

        await connection.end();
    } catch (error) {
        console.error('Verification failed:', error);
    }
}

verify();

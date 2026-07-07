import mysql from 'mysql2/promise';
import 'dotenv/config'

function connect () {
    const DBConnect = mysql.createPool({
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        waitForConnections: true,
        connectionLimit: 10, 
        foundRows: true
    })

    return DBConnect
};

export default connect()
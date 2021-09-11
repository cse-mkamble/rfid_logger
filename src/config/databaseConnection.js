const mysql = require('mysql');

const databaseConnection = async () => {
    try {
        const connection = mysql.createConnection({
            host: process.env.DATABASEHOST,
            user: process.env.DATABASEUSER,
            password: process.env.DATABASEPASSWORD,
            database: process.env.DATABASENAME
        })

        await connection.connect((err) => {
            if (err) console.log('============== Database Connection Error ==============');
            console.log('============== Database Connected Successfully ==============');
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = databaseConnection;
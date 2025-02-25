const sql = require("mssql");

const config = {
    server: "localhost",
    database: "EnglishCenterDB",
    user: 'nhung',
    password: '123456',
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
}

module.exports = {
    connect: () => sql.connect(config),
    sql,
}
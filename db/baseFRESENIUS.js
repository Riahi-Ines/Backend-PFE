exports.sqlConfig = {
    user: 'test',
    password: 'test',
    database: 'FRESENIUS',
    server: 'localhost',
    port: parseInt('1433', 10),
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
  }
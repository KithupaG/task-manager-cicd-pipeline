const Pool = required("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "BuduAmmoRoot@123!",
    host: "localhost",
    port: 5432,
    database: "perntodo"
})

module.exports = pool;
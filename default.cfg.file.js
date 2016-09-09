// Your config details go inside this JSON (db, keys, passwords, etc)
// This is a DEFAULT file, make a copy, edit it and rename it to ".cfg.js"
module.exports = {
  server: {
    port: 3000
  },
  db: {
    dialect: 'postgres?',
    timezone: '-03:00',
    host: 'postgres_host',
    port: 5432,
    db: 'postgres_database',
    username: 'login_role_name',
    password: 'login_role_password'
  },
  debug: false
}

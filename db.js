const sqlite3 = require('sqlite3').verbose();

// Open SQLite database
const db = new sqlite3.Database('./database.db');

// Create 'locations' table if not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        lat REAL,
        long REAL
    )`);
});

module.exports = db;

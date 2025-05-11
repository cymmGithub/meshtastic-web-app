const Database = require('better-sqlite3');
const path = require('path');

// Inicjalizacja bazy danych
const db = new Database(path.join(__dirname, '../../messages.db'), { verbose: console.log });

// Włącz obsługę kluczy obcych
db.pragma('foreign_keys = ON');

// Tworzenie tabeli wiadomości
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    category TEXT,
    priority TEXT,
    target_audience TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db; 
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("app.db");;

export const setupDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);

  await db.execAsync(`
    INSERT OR IGNORE INTO users (username, password)
    VALUES ('Maria', '874920');
  `);
};

export default db;

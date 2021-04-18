import { DB } from "./deps.ts";

const DB_FILE = "main.db";

export function initialize() {
  const db = new DB(DB_FILE);
  db.query(
    "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)"
  );
  db.query(
    "CREATE TABLE IF NOT EXISTS carrot (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)"
  );
  db.close();
}

export default async function db(callback: (db: any) => void | Promise<void>) {
  let db: { close: () => void };
  try {
    db = new DB(DB_FILE);
  } catch (err) {
    return console.error("[Error connecting to DB]", err);
  }

  try {
    await callback(db);
  } catch (err) {
    console.error("[Error executing callback]", err);
  } finally {
    db.close();
  }
}

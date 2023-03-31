import { openDB } from 'idb';

const DB_NAME = 'jate';
const OBJ_STORE = 'jate';
const DB_VERSION = 1;

async function initDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (db.objectStoreNames.contains(OBJ_STORE)) {
        console.log(`${OBJ_STORE} object store already exists`);
        return;
      }
      db.createObjectStore(OBJ_STORE, { keyPath: 'id', autoIncrement: true });
      console.log(`${OBJ_STORE} object store created`);
    },
  });
  return db;
}

export async function putDb(content) {
  console.log('Putting data into the database...');
  const db = await initDB();
  const tx = db.transaction(OBJ_STORE, 'readwrite');
  const store = tx.objectStore(OBJ_STORE);
  const result = await store.add({ jate: content });
  console.log('Data saved with key', result);
}

export async function getDb() {
  console.log('Getting all data from the database...');
  const db = await initDB();
  const tx = db.transaction(OBJ_STORE, 'readonly');
  const store = tx.objectStore(OBJ_STORE);
  const result = await store.getAll();
  if (result.length === 0) {
    console.log('No data found in the database');
    return null;
  } else {
    console.log('Data retrieved', result);
    return result;
  }
}

initDB();

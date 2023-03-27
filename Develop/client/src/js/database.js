import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const getAllFromDb = async () => {
  const dbName = 'jateStore';
  const jateStoreDb = await openDB(dbName, 1);
  const transaction = jateStoreDb.transaction(dbName, 'readonly');
  const objectStore = transaction.objectStore(dbName);
  const getAllRequest = objectStore.getAll();
  const allData = await getAllRequest;
  return allData.length === 0 ? null : allData;
  };

// TODO: Add logic for a method that gets all the content from the database
export const addToDb = async (content) => {
  const dbName = 'jateStore';
  const jateStoreDb = await openDB(dbName, 1);
  const transaction = jateStoreDb.transaction(dbName, 'readwrite');
  const objectStore = transaction.objectStore(dbName);
  const putRequest = objectStore.put({ content, id: 1 });
  const requestResult = await putRequest;
  };
  
initdb();

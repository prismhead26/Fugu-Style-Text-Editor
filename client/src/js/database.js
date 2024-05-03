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

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // open the database
  const db = await openDB('jate', 1);
  // create a transaction
  const tx = db.transaction('jate', 'readwrite');
  // get the object store
  const store = tx.objectStore('jate');
  // await the request and add the content to the database
  const request = await store.put({id: 1, value: content});
  
  console.log('Content added to the database', request);
  return request;
}

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // open the database
  const db = await openDB('jate', 1);
  // create a transaction
  const tx = db.transaction('jate', 'readonly');
  // get the object store
  const store = tx.objectStore('jate');
  // get all the content
  const content = await store.getAll();

  console.log('Content retrieved from the database');
  return content.value;
}

initdb();

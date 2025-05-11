const DB_NAME = 'meshtastic_messages';
const DB_VERSION = 1;
const STORE_NAME = 'messages';

let db = null;

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('sender_id', 'sender_id', { unique: false });
        store.createIndex('receiver_id', 'receiver_id', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
};

export const messages = {
  async init() {
    if (!db) {
      await initDB();
    }
  },

  async save(senderId, receiverId, content) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const message = {
        sender_id: senderId,
        receiver_id: receiverId,
        content,
        timestamp: new Date().toISOString(),
        is_read: false
      };

      const request = store.add(message);
      request.onsuccess = () => resolve(message);
      request.onerror = () => reject(request.error);
    });
  },

  async getAll(userId) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const messages = request.result.filter(msg => 
          msg.sender_id === userId || msg.receiver_id === userId
        );
        resolve(messages.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        ));
      };
      request.onerror = () => reject(request.error);
    });
  },

  async markAsRead(messageId) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(messageId);

      request.onsuccess = () => {
        const message = request.result;
        if (message) {
          message.is_read = true;
          const updateRequest = store.put(message);
          updateRequest.onsuccess = () => resolve(message);
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          reject(new Error('Message not found'));
        }
      };
      request.onerror = () => reject(request.error);
    });
  },

  async getUnread(userId) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const messages = request.result.filter(msg => 
          msg.receiver_id === userId && !msg.is_read
        );
        resolve(messages.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        ));
      };
      request.onerror = () => reject(request.error);
    });
  },

  async getById(messageId) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(messageId);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async delete(messageId) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(messageId);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}; 
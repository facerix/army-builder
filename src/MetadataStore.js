const DB_NAME = 'PersonnelMetadataDB';
const DB_VERSION = 1;
const STORE_NAME = 'metadata';
const SHARED_ENTITIES_UNIT_NAME = 'SHARED_ENTITIES';

let instance;

class MetadataStore {
  #db = null;
  #initPromise = null;
  #isInitialized = false;
  #memoryCache = new Map();

  constructor() {
    if (instance) {
      throw new Error('New instance cannot be created!!');
    }
    instance = this;
  }

  #buildKey(gameSystem, factionName, unitName = '*') {
    return `${gameSystem}:${factionName}:${unitName}`;
  }

  #buildRecord(gameSystem, factionName, unitName, metadata) {
    return {
      key: this.#buildKey(gameSystem, factionName, unitName),
      gameSystem,
      factionName,
      unitName,
      metadata: metadata || {},
    };
  }

  #initDB() {
    if (this.#initPromise) {
      return this.#initPromise;
    }

    this.#initPromise = new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('IndexedDB is not available in this environment.'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          store.createIndex('gameSystem', 'gameSystem', { unique: false });
          store.createIndex('factionName', 'factionName', { unique: false });
          store.createIndex('gameSystemFaction', ['gameSystem', 'factionName'], { unique: false });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to open IndexedDB.'));
      };
    });

    return this.#initPromise;
  }

  async #ensureInitialized() {
    if (this.#isInitialized) {
      return;
    }

    try {
      this.#db = await this.#initDB();
      this.#isInitialized = true;
    } catch (error) {
      console.error('MetadataStore failed to initialize IndexedDB:', error);
      this.#db = null;
      this.#isInitialized = false;
    }
  }

  async #getRecord(key) {
    await this.#ensureInitialized();
    if (!this.#db) {
      return null;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.#db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to read metadata.'));
      };
    });
  }

  async #putRecord(record) {
    await this.#ensureInitialized();
    if (!this.#db) {
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.#db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.put(record);

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onabort = () => {
        reject(transaction.error || new Error('Metadata write transaction aborted.'));
      };

      transaction.onerror = () => {
        reject(transaction.error || new Error('Failed to write metadata.'));
      };
    });
  }

  async #deleteRecord(key) {
    await this.#ensureInitialized();
    if (!this.#db) {
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.#db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.delete(key);

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onabort = () => {
        reject(transaction.error || new Error('Metadata delete transaction aborted.'));
      };

      transaction.onerror = () => {
        reject(transaction.error || new Error('Failed to delete metadata.'));
      };
    });
  }

  async #getRecordsByIndex(indexName, query) {
    await this.#ensureInitialized();
    if (!this.#db) {
      return [];
    }

    return new Promise((resolve, reject) => {
      const transaction = this.#db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const source = indexName ? store.index(indexName) : store;
      const results = [];
      const request = source.openCursor(query);

      request.onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to read metadata.'));
      };
    });
  }

  async getUnitMetadata(gameSystem, factionName, unitName) {
    const key = this.#buildKey(gameSystem, factionName, unitName);
    if (this.#memoryCache.has(key)) {
      return this.#memoryCache.get(key);
    }

    try {
      const record = await this.#getRecord(key);
      if (record?.metadata) {
        this.#memoryCache.set(key, record.metadata);
        return record.metadata;
      }
    } catch (error) {
      console.error('Failed to load unit metadata:', error);
    }

    return {};
  }

  async getFactionMetadata(gameSystem, factionName) {
    const key = this.#buildKey(gameSystem, factionName, SHARED_ENTITIES_UNIT_NAME);
    if (this.#memoryCache.has(key)) {
      return this.#memoryCache.get(key);
    }

    try {
      const record = await this.#getRecord(key);
      if (record?.metadata) {
        this.#memoryCache.set(key, record.metadata);
        return record.metadata;
      }
    } catch (error) {
      console.error('Failed to load faction metadata:', error);
    }

    return {};
  }

  async setUnitMetadata(gameSystem, factionName, unitName, metadata) {
    try {
      const record = this.#buildRecord(gameSystem, factionName, unitName, metadata);
      await this.#putRecord(record);
      this.#memoryCache.set(record.key, record.metadata);
    } catch (error) {
      console.error('Failed to set unit metadata:', error);
    }
  }

  async setFactionMetadata(gameSystem, factionName, metadata) {
    await this.setUnitMetadata(gameSystem, factionName, SHARED_ENTITIES_UNIT_NAME, metadata);
  }

  async deleteUnitMetadata(gameSystem, factionName, unitName) {
    const key = this.#buildKey(gameSystem, factionName, unitName);
    try {
      await this.#deleteRecord(key);
      this.#memoryCache.delete(key);
    } catch (error) {
      console.error('Failed to delete unit metadata:', error);
    }
  }

  async importMetadata(gameSystem, factionName, unitMetadataArray, sharedUpgradesMetadataArray) {
    await this.#ensureInitialized();
    if (!this.#db) {
      return;
    }

    const records = [];
    unitMetadataArray.forEach(unitMetadata => {
      const { name, ...metadata } = unitMetadata;
      records.push(this.#buildRecord(gameSystem, factionName, name, metadata));
    });

    if (sharedUpgradesMetadataArray?.length > 0) {
      const sharedMetadata = {};
      sharedUpgradesMetadataArray.forEach(sharedUpgradeMetadata => {
        const { name, description } = sharedUpgradeMetadata;
        sharedMetadata[name.toLowerCase()] = { description };
      });
      records.push(
        this.#buildRecord(gameSystem, factionName, SHARED_ENTITIES_UNIT_NAME, sharedMetadata)
      );
    }

    if (records.length === 0) {
      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.#db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      records.forEach(record => {
        store.put(record);
        this.#memoryCache.set(record.key, record.metadata);
      });

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onabort = () => {
        reject(transaction.error || new Error('Metadata import transaction aborted.'));
      };

      transaction.onerror = () => {
        reject(transaction.error || new Error('Failed to import metadata.'));
      };
    });
  }

  async exportMetadata(gameSystem, factionName) {
    let records = [];
    try {
      if (gameSystem && factionName) {
        const query = window.IDBKeyRange.only([gameSystem, factionName]);
        records = await this.#getRecordsByIndex('gameSystemFaction', query);
      } else if (gameSystem) {
        const query = window.IDBKeyRange.only(gameSystem);
        records = await this.#getRecordsByIndex('gameSystem', query);
      } else if (factionName) {
        const query = window.IDBKeyRange.only(factionName);
        records = await this.#getRecordsByIndex('factionName', query);
      } else {
        records = await this.#getRecordsByIndex(null, null);
      }
    } catch (error) {
      console.error('Failed to export metadata:', error);
      return {};
    }

    return records.reduce((acc, record) => {
      if (!acc[record.gameSystem]) {
        acc[record.gameSystem] = {};
      }
      if (!acc[record.gameSystem][record.factionName]) {
        acc[record.gameSystem][record.factionName] = {};
      }
      acc[record.gameSystem][record.factionName][record.unitName] = record.metadata || {};
      return acc;
    }, {});
  }
}

const metadataStore = Object.freeze(new MetadataStore());

export const getUnitMetadata = (gameSystem, factionName, unitName) =>
  metadataStore.getUnitMetadata(gameSystem, factionName, unitName);

export const getFactionMetadata = (gameSystem, factionName) =>
  metadataStore.getFactionMetadata(gameSystem, factionName);

export const setUnitMetadata = (gameSystem, factionName, unitName, metadata) =>
  metadataStore.setUnitMetadata(gameSystem, factionName, unitName, metadata);

export const setFactionMetadata = (gameSystem, factionName, metadata) =>
  metadataStore.setFactionMetadata(gameSystem, factionName, metadata);

export const deleteUnitMetadata = (gameSystem, factionName, unitName) =>
  metadataStore.deleteUnitMetadata(gameSystem, factionName, unitName);

export const importMetadata = (gameSystem, factionName, unitMetadataArray) =>
  metadataStore.importMetadata(gameSystem, factionName, unitMetadataArray);

export const exportMetadata = (gameSystem, factionName) =>
  metadataStore.exportMetadata(gameSystem, factionName);

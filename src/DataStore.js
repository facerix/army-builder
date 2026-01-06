// singleton class to manage the user's data

import { v4WithTimestamp } from "./uuid.js";

let instance;
class DataStore extends EventTarget {
  #items = [];
  #itemsById = new Map(); // map from uuid to index in the #items array

  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    super();

    instance = this;
  }

  #loadRecordsFromJson(json) {
    const records = JSON.parse(json);
    records.forEach((item, index) => {
      // normalize (add expected fields for records that don't already have them)
      if (!item.id) {
        records[index].id = v4WithTimestamp();
      }
    });
    return records;
  }

  // if we eventually allow other storage besides local (i.e. DB, cloud, etc), this will need to be more robust;
  // for now, just load the records from localStorage or set it up if not yet set
  async init() {
    let savedItemsJson = window.localStorage.getItem("armyLists");
    if (!savedItemsJson) {
      savedItemsJson = "[]";
      window.localStorage.setItem("armyLists", savedItemsJson);
    }
    this.#items = this.#loadRecordsFromJson(savedItemsJson);
    this.#reindex();

    setTimeout(() => {
      this.#emitChangeEvent("init", ["*"]);
    }, 0);
  }

  import(jsonData) {
    const newItems = this.#loadRecordsFromJson(jsonData);
    Array.prototype.unshift.apply(this.#items, newItems);
    this.#reindex();

    setTimeout(() => {
      this.#emitChangeEvent("init", ["*"]);
    }, 0);
  }

  #saveItems() {
    window.localStorage.setItem("armyLists", JSON.stringify(this.#items));
  }

  #emitChangeEvent(changeType, affectedRecords) {
    const changeEvent = new CustomEvent("change", {
      detail: {
        items: this.#items,
        changeType,
        affectedRecords
      },
    });
    this.dispatchEvent(changeEvent);
  }

  #reindex() {
    this.#itemsById = new Map();
    this.#items.forEach(idea => {
      this.#itemsById.set(idea.id, idea);
    });
    this.#saveItems();
  }

  get items() {
    return this.#items;
  };

  getItemById(id) {
    return this.#itemsById.get(id);
  }

  addItem(record) {
    record.id = v4WithTimestamp();
    this.#items.unshift(record);
    this.#reindex();
    this.#emitChangeEvent("add", record);
  }

  updateItem(record) {
    const index = this.#items.findIndex(rec => rec.id === record.id);
    if (index > -1) {
      this.#items[index] = record;
      this.#reindex();
      this.#emitChangeEvent("update", record);
    }
  }

  deleteItem(id) {
    if (this.#itemsById.has(id)) {
      this.#items = this.#items.filter(r => r.id !== id);
      this.#reindex();
      this.#emitChangeEvent("delete", [id]);
    }
  }
}

const singleton = Object.freeze(new DataStore());

export default singleton;
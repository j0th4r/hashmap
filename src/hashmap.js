export default class HashMap {
  constructor() {
    this.loadFactor = 0.8;
    this.capacity = 16;
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  hash(key) {
    let hashCode = 0;
  
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  } 

  set(key, value) {
    const entry = this.hash(key);
    const bucket = this.buckets[entry];

    for (let e of bucket) {
      if (e.key === key) {
        e.value = value;
        return
      }
    }

    bucket.push({ key, value });
  }

  get(key) {
    const entry = this.hash(key);
    const bucket = this.buckets[entry];

    for (let e of bucket) {
      if (e.key === key) {
        return e.value
      }
    }

    return null;
  }

  has(key) {
    const entry = this.hash(key);
    const bucket = this.buckets[entry];

    for (let e of bucket) {
      if (e.key === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const entry = this.hash(key);
    const bucket = this.buckets[entry];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  length() {
    let count = 0;
    for (const bucket of this.buckets) {
      count += bucket.length;
    }
    return count;
  }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
  }

  keys() {
    let keys = []
    for (const bucket of this.buckets) {
      for (const { key } of bucket) {
        keys.push(key)
      }
    }
    return keys;
  }

  values() {
    let values = []
    for (const bucket of this.buckets) {
      for (const { value } of bucket) {
        values.push(value)
      }
    }
    return values;
  }

  entries() {
    let entries = []
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push([entry.key, entry.value])
      }
    }
    return entries;
  }

}
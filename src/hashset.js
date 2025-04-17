export default class HashSet {
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

  add(key) {
    const entry = this.hash(key);
    const bucket = this.buckets[entry];

    for (let e of bucket) {
      if (e === key) {
        return;
      }
    }

    bucket.push(key);
  }

  has(key) {
    const entry = this.hash(key);
    const bucket = this.buckets[entry];

    for (let e of bucket) {
      if (e === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const entry = this.hash(key);
    const bucket = this.buckets[entry];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  size() {
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
    const allKeys = [];
    for (const bucket of this.buckets) {
      for (const key of bucket) {
        allKeys.push(key);
      }
    }
    return allKeys;
  }
}

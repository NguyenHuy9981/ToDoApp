const redis = require('../../config/redis/connect');

const listCache = {
  userDetail: {
    key: 'user:detail',
    ttl: 30,
  },
  todoDetail: {
    key: 'todo:detail',
    ttl: 30,
  },
};

const buildCache = ({ key, ttl }) => class {
  constructor(id) {
    this.id = id;
    this.ttl = ttl;
    this.value = null;
    this.path = `cache:${key}:${id}`;
  }

  async get() {
    this.value = await redis.get(this.path);
    try {
      this.value = await JSON.parse(this.value);
    } catch (error) {
      // Error
    }
    return this.value;
  }

  async set(value) {
    await redis.set(this.path, JSON.stringify(value));
    this.value = value;
    return value;
  }

  async delete() {
    await redis.del(this.path);
    this.value = null;
  }
};

module.exports = {
  CacheUser: buildCache(listCache.userDetail),
  CacheTodo: buildCache(listCache.todoDetail),
};

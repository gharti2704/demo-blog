const redis = require("redis");

const redisClient = redis.createClient(process.env.REDIS_URI);

//save token in redis server
module.exports.setToken = (token, id) => {
  return new Promise((resolve, reject) => {
    redisClient.set(token, id, (err) => {
      if (err) {
        reject("Unable to save");
      }
      resolve(token, id);
    });
  });
};

module.exports.getToken = (token) => {
  return new Promise((resolve, reject) => {
    redisClient.get(token, (err, id) => {
      if (err) {
        reject("Unable to get token");
      } else if (id === null) {
        reject("Unable to verify.");
      }

      resolve(id);
    });
  });
};

module.exports.removeToken = (token) => {
  return new Promise((resolve, reject) => {
    redisClient.del(token, (err, id) => {
      if (err) {
        reject("Unable to remove");
      }

      resolve("Token removed");
    });
  });
};

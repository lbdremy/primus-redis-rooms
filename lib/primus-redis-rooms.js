var Rooms = require('./rooms');
var Spark = require('./spark');

var PrimusRedisRooms = module.exports = function (primus, options) {
  var self = this;
  var sub, pub, channel;

  channel = options.redis.channel || 'primus';

  pub = options.redis.getClient();
  sub = options.redis.getClient();

  self.rooms = new Rooms({
    redis: {
      pub: pub,
      sub: sub,
      channel: channel
    }
  });

  primus.room = function (name) {
    return self.rooms.room(name);
  };

  Spark(primus.Spark);
};

// Hack so that you can `primus.use(require('primus-redis-rooms'))`.
PrimusRedisRooms.server = PrimusRedisRooms;

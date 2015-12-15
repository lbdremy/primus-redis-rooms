var http = require('http');
var Primus = require('primus');
var PrimusRedisRooms = require('../../');
var redis = require('redis');

module.exports = function getPrimus(port) {
  var server = http.createServer();
  var primus = new Primus(server, {
    redis : {
      getClient : function () {
        return redis.createClient();
      }
    },
    transformer: 'websockets'
  });
  primus.use('redis', PrimusRedisRooms);

  primus.port = port;
  primus.server = server;
  server.listen(port);
  return primus;
};

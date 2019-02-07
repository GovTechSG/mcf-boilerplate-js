// this file is intentionally written in es5 so that it can be
// run by older versions of node

/* eslint-disable no-var */
var express = require('express');
var Q = require('q');
var provisionProcess = require('../../src');

var testServer = express();
testServer.use(function(_req, res) {
  res.json('ok');
});
var testServerInstance = testServer.listen();
testServerInstance.on('listening', function() {
  console.info(
    `_test_output_ listening on ${testServerInstance.address().port}...`
  );
});

provisionProcess
  .addMiddleware(function() {
    var q = Q.defer();
    setTimeout(function() {
      console.info('_test_output_ middleware ran');
      q.resolve(true);
    }, 10);
    return q.promise;
  })
  .addMiddleware(function() {
    var q = Q.defer();
    testServerInstance.close(function(err) {
      if (err) {
        console.error('AN ERROR OCCURRED');
        console.error(err);
      } else {
        console.info('_test_output_ server closed');
      }
      q.resolve(err);
    });
    return q.promise;
  });

provisionProcess();

module.exports = testServer;

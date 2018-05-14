'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createServer;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = createServer;

function createServer() {
  var server = (0, _express2.default)();

  return server;
}
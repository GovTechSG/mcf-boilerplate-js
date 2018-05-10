'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BoilerplateServer;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BoilerplateServer() {
  var server = (0, _express2.default)();

  return server;
};
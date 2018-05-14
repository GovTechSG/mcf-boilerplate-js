import express from 'express';

module.exports = createServer;

export default function createServer() {
  const server = express();

  return server;
}

import express from 'express';
import cookieParser from 'cookie-parser';

module.exports = createServer;

export default function createServer() {
  const server = express();
  server.use(cookieParser());

  return server;
}

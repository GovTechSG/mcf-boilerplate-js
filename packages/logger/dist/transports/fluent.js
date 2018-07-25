"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fluent_logger_1 = __importDefault(require("fluent-logger"));
var os_1 = __importDefault(require("os"));
var defaultTag = process.env.HOSTNAME || os_1.default.hostname() || 'unknown';
var defaultHost = 'localhost';
var defaultPort = 24224;
var defaultTimeout = 3.0;
var defaultRequireAckResponse = false;
var defaultReconnectInterval = 30000;
var defaultTls = false;
function createFluentTransport(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.host, host = _c === void 0 ? defaultHost : _c, _d = _b.port, port = _d === void 0 ? defaultPort : _d, _e = _b.requireAckResponse, requireAckResponse = _e === void 0 ? defaultRequireAckResponse : _e, reconnectInterval = _b.reconnectInterval, security = _b.security, _f = _b.tag, tag = _f === void 0 ? defaultTag : _f, _g = _b.timeout, timeout = _g === void 0 ? defaultTimeout : _g, _h = _b.tls, tls = _h === void 0 ? defaultTls : _h, tlsOptions = _b.tlsOptions;
    var fluentTransport = fluent_logger_1.default.support.winstonTransport();
    return new fluentTransport({
        host: host,
        port: port,
        reconnectInterval: reconnectInterval,
        requireAckResponse: requireAckResponse,
        security: security,
        tag: tag,
        timeout: timeout,
        tls: tls,
        tlsOptions: tlsOptions,
    });
}
exports.createFluentTransport = createFluentTransport;
//# sourceMappingURL=fluent.js.map
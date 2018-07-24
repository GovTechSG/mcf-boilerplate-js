"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var transports_1 = require("./transports");
exports.createConsoleTransport = transports_1.createConsoleTransport;
exports.createFluentTransport = transports_1.createFluentTransport;
var _a = winston_1.default.format, combine = _a.combine, timestamp = _a.timestamp, json = _a.json;
// tslint:disable object-literal-sort-keys
// using value order rather than key order makes more sense
// TODO see if we can use defaults and http
var defaultLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
    silly: 5,
};
// tslint:enable object-literal-sort-keys
var defaultLevel = 'silly';
var defaultTransporters = [transports_1.createConsoleTransport()];
var defaultAdditionalTransports = [];
function createLogger(_a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, _c = _b.formatters, formatters = _c === void 0 ? [] : _c, _d = _b.level, level = _d === void 0 ? defaultLevel : _d, _e = _b.transports, transports = _e === void 0 ? defaultTransporters : _e, _f = _b.additionalTransports, additionalTransports = _f === void 0 ? defaultAdditionalTransports : _f;
    var logger = winston_1.default.createLogger({
        exitOnError: false,
        format: combine.apply(void 0, formatters.map(winston_1.default.format).map(function (fn) { return fn(); }).concat([// need the second call to unwrap the formatter
            timestamp(),
            json()])),
        level: level,
        levels: defaultLevels,
        transports: transports.concat(additionalTransports),
    });
    // for any reason spread operator complain :)
    // tslint:disable-next-line prefer-object-spread
    return Object.assign({}, logger, {
        getStream: function (httpLogLevel) { return ({
            // @ts-ignore
            write: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _a;
                return (_a = _this.logger)[httpLogLevel].apply(_a, args);
            },
        }); },
    });
}
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map
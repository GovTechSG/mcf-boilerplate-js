"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var _a = winston_1.default.format, combine = _a.combine, timestamp = _a.timestamp, json = _a.json;
// tslint:disable object-literal-sort-keys
// using value order rather than key order makes more sense
// TODO see if we can use defaults and http
var defaultLogLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
    silly: 5,
};
// tslint:enable object-literal-sort-keys
var defaultLogLevel = 'http';
var defaultLogTransporter = [new winston_1.default.transports.Console()];
/**
 * @param {Object} options
 * @param {Array<Function>} options.logFormatters
 * @param {String} options.logLevel
 * @param {Array<Object>} options.logTransporters
 */
function createLogger(_a) {
    var _this = this;
    var _b = _a.logFormatters, logFormatters = _b === void 0 ? [] : _b, _c = _a.logLevel, logLevel = _c === void 0 ? defaultLogLevel : _c, _d = _a.logTransporters, logTransporters = _d === void 0 ? defaultLogTransporter : _d;
    var logger = winston_1.default.createLogger({
        exitOnError: false,
        format: combine.apply(void 0, logFormatters.map(winston_1.default.format).map(function (fn) { return fn(); }).concat([// need the second call to unwrap the formatter
            timestamp(),
            json()])),
        level: logLevel,
        levels: defaultLogLevels,
        transports: logTransporters,
    });
    // for any reason spread operator complain :)
    // tslint:disable-next-line prefer-object-spread
    return Object.assign(logger, {
        getStream: function (level) { return ({
            // @ts-ignore
            write: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _a;
                return (_a = _this.logger)[level].apply(_a, args);
            },
        }); },
    });
}
exports.createLogger = createLogger;
//# sourceMappingURL=index.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BchdValidator = void 0;
var BchdValidator = /** @class */ (function () {
    function BchdValidator(client, logger) {
        this.client = client;
        if (logger) {
            this.logger = logger;
        }
    }
    BchdValidator.prototype.getRawTransactions = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getRawTransaction({ hash: txid[0], reversedHashOrder: true })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, [Buffer.from(res.getTransaction_asU8()).toString("hex")]];
                }
            });
        });
    };
    BchdValidator.prototype.isValidSlpTxid = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.log("validate: " + txid);
                        return [4 /*yield*/, this.client.getTrustedSlpValidation({
                                txos: [{ vout: 1, hash: txid }],
                                reversedHashOrder: true
                            })];
                    case 1:
                        res = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        if (!error_1.message.includes("txid is missing from slp validity set")) {
                            throw error_1;
                        }
                        this.log("false (" + txid + ")");
                        return [2 /*return*/, false];
                    case 3:
                        this.log("true (" + txid + ")");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BchdValidator.prototype.validateSlpTransactions = function (txids) {
        return __awaiter(this, void 0, void 0, function () {
            var res, txids_1, txids_1_1, txid, _a, _b, e_1_1;
            var e_1, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        res = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        txids_1 = __values(txids), txids_1_1 = txids_1.next();
                        _d.label = 2;
                    case 2:
                        if (!!txids_1_1.done) return [3 /*break*/, 5];
                        txid = txids_1_1.value;
                        _b = (_a = res).push;
                        return [4 /*yield*/, this.isValidSlpTxid(txid)];
                    case 3:
                        _b.apply(_a, [(_d.sent()) ? txid : ""]);
                        _d.label = 4;
                    case 4:
                        txids_1_1 = txids_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (txids_1_1 && !txids_1_1.done && (_c = txids_1.return)) _c.call(txids_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, res.filter(function (id) { return id.length > 0; })];
                }
            });
        });
    };
    BchdValidator.prototype.log = function (s) {
        if (this.logger) {
            this.logger.log(s);
        }
    };
    return BchdValidator;
}());
exports.BchdValidator = BchdValidator;
//# sourceMappingURL=bchdtrustedvalidator.js.map
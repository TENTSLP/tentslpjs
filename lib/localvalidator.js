"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalValidator = void 0;
var index_1 = require("../index");
var slp_1 = require("./slp");
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var Bitcore = __importStar(require("bitcore-lib-cash"));
var crypto_1 = require("./crypto");
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var LocalValidator = /** @class */ (function () {
    function LocalValidator(BITBOX, getRawTransactions, logger, useTransactionCache) {
        if (useTransactionCache === void 0) { useTransactionCache = true; }
        this.logger = { log: function (s) { return null; } };
        if (!BITBOX) {
            throw Error("Must provide BITBOX instance to class constructor.");
        }
        if (!getRawTransactions) {
            throw Error("Must provide method getRawTransactions to class constructor.");
        }
        if (logger) {
            this.logger = logger;
        }
        this.BITBOX = BITBOX;
        this.getRawTransactions = getRawTransactions;
        this.slp = new slp_1.Slp(BITBOX);
        this.cachedValidations = {};
        this.cachedRawTransactions = {};
        this.useTransactionCache = useTransactionCache;
    }
    LocalValidator.prototype.addValidationFromStore = function (hex, isValid) {
        var id = crypto_1.Crypto.txid(Buffer.from(hex, "hex")).toString("hex");
        if (!this.cachedValidations[id]) {
            this.cachedValidations[id] = { validity: isValid, parents: [], details: null, invalidReason: null, waiting: false };
        }
        if (!this.cachedRawTransactions[id] && this.useTransactionCache) {
            this.cachedRawTransactions[id] = hex;
        }
    };
    LocalValidator.prototype.waitForCurrentValidationProcessing = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var cached;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cached = this.cachedValidations[txid];
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 3];
                        if (typeof cached.validity === "boolean") {
                            cached.waiting = false;
                            return [3 /*break*/, 3];
                        }
                        return [4 /*yield*/, sleep(10)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LocalValidator.prototype.waitForTransactionDownloadToComplete = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 2];
                        if (this.cachedRawTransactions[txid] && this.cachedRawTransactions[txid] !== "waiting") {
                            return [3 /*break*/, 2];
                        }
                        return [4 /*yield*/, sleep(10)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    LocalValidator.prototype.retrieveRawTransaction = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var txns;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.useTransactionCache && !this.cachedRawTransactions[txid])) return [3 /*break*/, 2];
                        this.cachedRawTransactions[txid] = "waiting";
                        return [4 /*yield*/, this.getRawTransactions([txid])];
                    case 1:
                        txns = _a.sent();
                        if (!txns || txns.length === 0 || typeof txns[0] !== "string") {
                            throw Error("Response error in getRawTransactions, got: " + txns);
                        }
                        this.cachedRawTransactions[txid] = txns[0];
                        return [2 /*return*/, txns[0]];
                    case 2:
                        if (!this.useTransactionCache) return [3 /*break*/, 3];
                        return [2 /*return*/, this.cachedRawTransactions[txid]];
                    case 3: return [4 /*yield*/, this.getRawTransactions([txid])];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LocalValidator.prototype.isValidSlpTxid = function (txid, tokenIdFilter, tokenTypeFilter) {
        return __awaiter(this, void 0, void 0, function () {
            var valid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.logger.log("SLPJS Validating: " + txid);
                        return [4 /*yield*/, this._isValidSlpTxid(txid, tokenIdFilter, tokenTypeFilter)];
                    case 1:
                        valid = _a.sent();
                        this.logger.log("SLPJS Result: " + valid + " (" + txid + ")");
                        if (!valid && this.cachedValidations[txid].invalidReason) {
                            this.logger.log("SLPJS Invalid Reason: " + this.cachedValidations[txid].invalidReason);
                        }
                        else if (!valid) {
                            this.logger.log("SLPJS Invalid Reason: unknown (result is user supplied)");
                        }
                        return [2 /*return*/, valid];
                }
            });
        });
    };
    //
    // This method uses recursion to do a Depth-First-Search with the node result being
    // computed in Postorder Traversal (left/right/root) order.  A validation cache
    // is used to keep track of the results for nodes that have already been evaluated.
    //
    // Each call to this method evaluates node validity with respect to
    // its parent node(s), so it walks backwards until the
    // validation cache provides a result or the GENESIS node is evaluated.
    // Root nodes await the validation result of their upstream parent.
    //
    // In the case of NFT1 the search continues to the group/parent NFT DAG after the Genesis
    // of the NFT child is discovered.
    //
    LocalValidator.prototype._isValidSlpTxid = function (txid, tokenIdFilter, tokenTypeFilter) {
        return __awaiter(this, void 0, void 0, function () {
            var txn, slpmsg, input_txid, input_prevout, input_txhex, input_tx, input_slpmsg, nft_parent_dag_validity, i, input_txid, input_txhex, input_tx, input_slpmsg, tokenOutQty, tokenInQty, i, input_txid, input_txhex, input_tx, input_slpmsg, parentTxids, _loop_1, this_1, parentTxids_1, parentTxids_1_1, id, e_1_1, validInputQty, tokenOutQty, validVersionType;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.cachedValidations[txid]) return [3 /*break*/, 2];
                        this.cachedValidations[txid] = {
                            validity: null,
                            parents: [],
                            details: null,
                            invalidReason: null,
                            waiting: false,
                        };
                        return [4 /*yield*/, this.retrieveRawTransaction(txid)];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (typeof this.cachedValidations[txid].validity === "boolean") {
                            return [2 /*return*/, this.cachedValidations[txid].validity];
                        }
                        _b.label = 3;
                    case 3:
                        if (!(!this.cachedRawTransactions[txid] || this.cachedRawTransactions[txid] === "waiting")) return [3 /*break*/, 7];
                        if (!this.useTransactionCache) return [3 /*break*/, 5];
                        if (this.cachedRawTransactions[txid] !== "waiting") {
                            this.retrieveRawTransaction(txid);
                        }
                        // Wait for previously a initiated download to completed
                        return [4 /*yield*/, this.waitForTransactionDownloadToComplete(txid)];
                    case 4:
                        // Wait for previously a initiated download to completed
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, this.retrieveRawTransaction(txid)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        if (!this.cachedValidations[txid].waiting) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.waitForCurrentValidationProcessing(txid)];
                    case 8:
                        _b.sent();
                        if (typeof this.cachedValidations[txid].validity === "boolean") {
                            return [2 /*return*/, this.cachedValidations[txid].validity];
                        }
                        _b.label = 9;
                    case 9:
                        this.cachedValidations[txid].waiting = true;
                        txn = new Bitcore.Transaction(this.cachedRawTransactions[txid]);
                        try {
                            slpmsg = this.cachedValidations[txid].details = this.slp.parseSlpOutputScript(txn.outputs[0]._scriptBuffer);
                            if (slpmsg.transactionType === index_1.SlpTransactionType.GENESIS) {
                                slpmsg.tokenIdHex = txid;
                            }
                        }
                        catch (e) {
                            this.cachedValidations[txid].validity = false;
                            this.cachedValidations[txid].waiting = false;
                            this.cachedValidations[txid].invalidReason = "SLP OP_RETURN parsing error (" + e.message + ").";
                            return [2 /*return*/, this.cachedValidations[txid].validity];
                        }
                        // Check for tokenId filter
                        if (tokenIdFilter && slpmsg.tokenIdHex !== tokenIdFilter) {
                            this.cachedValidations[txid].waiting = false;
                            this.cachedValidations[txid].invalidReason = "Validator was run with filter only considering tokenId " + tokenIdFilter + " as valid.";
                            return [2 /*return*/, false]; // Don't save boolean result to cache incase cache is ever used without tokenIdFilter.
                        }
                        else {
                            if (this.cachedValidations[txid].validity !== false) {
                                this.cachedValidations[txid].invalidReason = null;
                            }
                        }
                        // Check specified token type is being respected
                        if (tokenTypeFilter && slpmsg.versionType !== tokenTypeFilter) {
                            this.cachedValidations[txid].validity = null;
                            this.cachedValidations[txid].waiting = false;
                            this.cachedValidations[txid].invalidReason = "Validator was run with filter only considering token type: " + tokenTypeFilter + " as valid.";
                            return [2 /*return*/, false]; // Don't save boolean result to cache incase cache is ever used with different token type.
                        }
                        else {
                            if (this.cachedValidations[txid].validity !== false) {
                                this.cachedValidations[txid].invalidReason = null;
                            }
                        }
                        if (!(slpmsg.transactionType === index_1.SlpTransactionType.GENESIS)) return [3 /*break*/, 14];
                        if (!(slpmsg.versionType === 0x41)) return [3 /*break*/, 12];
                        input_txid = txn.inputs[0].prevTxId.toString("hex");
                        input_prevout = txn.inputs[0].outputIndex;
                        return [4 /*yield*/, this.retrieveRawTransaction(input_txid)];
                    case 10:
                        input_txhex = _b.sent();
                        input_tx = new Bitcore.Transaction(input_txhex);
                        input_slpmsg = void 0;
                        try {
                            input_slpmsg = this.slp.parseSlpOutputScript(input_tx.outputs[0]._scriptBuffer);
                        }
                        catch (_) { }
                        if (!input_slpmsg || input_slpmsg.versionType !== 0x81) {
                            this.cachedValidations[txid].validity = false;
                            this.cachedValidations[txid].waiting = false;
                            this.cachedValidations[txid].invalidReason = "NFT1 child GENESIS does not have a valid NFT1 parent input.";
                            return [2 /*return*/, this.cachedValidations[txid].validity];
                        }
                        // Check that the there is a burned output >0 in the parent txn SLP message
                        if (input_slpmsg.transactionType === index_1.SlpTransactionType.SEND) {
                            if (input_prevout > input_slpmsg.sendOutputs.length - 1) {
                                this.cachedValidations[txid].validity = false;
                                this.cachedValidations[txid].waiting = false;
                                this.cachedValidations[txid].invalidReason = "NFT1 child GENESIS does not have a valid NFT1 parent input.";
                                return [2 /*return*/, this.cachedValidations[txid].validity];
                            }
                            else if (!input_slpmsg.sendOutputs[input_prevout].isGreaterThan(0)) {
                                this.cachedValidations[txid].validity = false;
                                this.cachedValidations[txid].waiting = false;
                                this.cachedValidations[txid].invalidReason = "NFT1 child's parent has SLP output that is not greater than zero.";
                                return [2 /*return*/, this.cachedValidations[txid].validity];
                            }
                            else {
                                this.cachedValidations[txid].validity = true;
                                this.cachedValidations[txid].waiting = false;
                            }
                        }
                        else if (input_slpmsg.transactionType === index_1.SlpTransactionType.GENESIS ||
                            input_slpmsg.transactionType === index_1.SlpTransactionType.MINT) {
                            if (input_prevout !== 1) {
                                this.cachedValidations[txid].validity = false;
                                this.cachedValidations[txid].waiting = false;
                                this.cachedValidations[txid].invalidReason = "NFT1 child GENESIS does not have a valid NFT1 parent input.";
                                return [2 /*return*/, this.cachedValidations[txid].validity];
                            }
                            else if (!input_slpmsg.genesisOrMintQuantity.isGreaterThan(0)) {
                                this.cachedValidations[txid].validity = false;
                                this.cachedValidations[txid].waiting = false;
                                this.cachedValidations[txid].invalidReason = "NFT1 child's parent has SLP output that is not greater than zero.";
                                return [2 /*return*/, this.cachedValidations[txid].validity];
                            }
                        }
                        return [4 /*yield*/, this.isValidSlpTxid(input_txid, undefined, 0x81)];
                    case 11:
                        nft_parent_dag_validity = _b.sent();
                        this.cachedValidations[txid].validity = nft_parent_dag_validity;
                        this.cachedValidations[txid].waiting = false;
                        if (!nft_parent_dag_validity) {
                            this.cachedValidations[txid].invalidReason = "NFT1 child GENESIS does not have valid parent DAG.";
                        }
                        return [2 /*return*/, this.cachedValidations[txid].validity];
                    case 12:
                        this.cachedValidations[txid].validity = true;
                        this.cachedValidations[txid].waiting = false;
                        return [2 /*return*/, this.cachedValidations[txid].validity];
                    case 13: return [3 /*break*/, 24];
                    case 14:
                        if (!(slpmsg.transactionType === index_1.SlpTransactionType.MINT)) return [3 /*break*/, 19];
                        i = 0;
                        _b.label = 15;
                    case 15:
                        if (!(i < txn.inputs.length)) return [3 /*break*/, 18];
                        input_txid = txn.inputs[i].prevTxId.toString("hex");
                        return [4 /*yield*/, this.retrieveRawTransaction(input_txid)];
                    case 16:
                        input_txhex = _b.sent();
                        input_tx = new Bitcore.Transaction(input_txhex);
                        try {
                            input_slpmsg = this.slp.parseSlpOutputScript(input_tx.outputs[0]._scriptBuffer);
                            if (input_slpmsg.transactionType === index_1.SlpTransactionType.GENESIS) {
                                input_slpmsg.tokenIdHex = input_txid;
                            }
                            if (input_slpmsg.tokenIdHex === slpmsg.tokenIdHex) {
                                if (input_slpmsg.transactionType === index_1.SlpTransactionType.GENESIS || input_slpmsg.transactionType === index_1.SlpTransactionType.MINT) {
                                    if (txn.inputs[i].outputIndex === input_slpmsg.batonVout) {
                                        this.cachedValidations[txid].parents.push({
                                            txid: txn.inputs[i].prevTxId.toString("hex"),
                                            vout: txn.inputs[i].outputIndex,
                                            versionType: input_slpmsg.versionType,
                                            valid: null,
                                            inputQty: null,
                                        });
                                    }
                                }
                            }
                        }
                        catch (_) { }
                        _b.label = 17;
                    case 17:
                        i++;
                        return [3 /*break*/, 15];
                    case 18:
                        if (this.cachedValidations[txid].parents.length < 1) {
                            this.cachedValidations[txid].validity = false;
                            this.cachedValidations[txid].waiting = false;
                            this.cachedValidations[txid].invalidReason = "MINT transaction must have at least 1 candidate baton parent input.";
                            return [2 /*return*/, this.cachedValidations[txid].validity];
                        }
                        return [3 /*break*/, 24];
                    case 19:
                        if (!(slpmsg.transactionType === index_1.SlpTransactionType.SEND)) return [3 /*break*/, 24];
                        tokenOutQty = slpmsg.sendOutputs.reduce(function (t, v) { return t.plus(v); }, new bignumber_js_1.default(0));
                        tokenInQty = new bignumber_js_1.default(0);
                        i = 0;
                        _b.label = 20;
                    case 20:
                        if (!(i < txn.inputs.length)) return [3 /*break*/, 23];
                        input_txid = txn.inputs[i].prevTxId.toString("hex");
                        return [4 /*yield*/, this.retrieveRawTransaction(input_txid)];
                    case 21:
                        input_txhex = _b.sent();
                        input_tx = new Bitcore.Transaction(input_txhex);
                        try {
                            input_slpmsg = this.slp.parseSlpOutputScript(input_tx.outputs[0]._scriptBuffer);
                            if (input_slpmsg.transactionType === index_1.SlpTransactionType.GENESIS) {
                                input_slpmsg.tokenIdHex = input_txid;
                            }
                            if (input_slpmsg.tokenIdHex === slpmsg.tokenIdHex) {
                                if (input_slpmsg.transactionType === index_1.SlpTransactionType.SEND) {
                                    if (txn.inputs[i].outputIndex <= input_slpmsg.sendOutputs.length - 1) {
                                        tokenInQty = tokenInQty.plus(input_slpmsg.sendOutputs[txn.inputs[i].outputIndex]);
                                        this.cachedValidations[txid].parents.push({
                                            txid: txn.inputs[i].prevTxId.toString("hex"),
                                            vout: txn.inputs[i].outputIndex,
                                            versionType: input_slpmsg.versionType,
                                            valid: null,
                                            inputQty: input_slpmsg.sendOutputs[txn.inputs[i].outputIndex]
                                        });
                                    }
                                }
                                else if (input_slpmsg.transactionType === index_1.SlpTransactionType.GENESIS || input_slpmsg.transactionType === index_1.SlpTransactionType.MINT) {
                                    if (txn.inputs[i].outputIndex === 1) {
                                        tokenInQty = tokenInQty.plus(input_slpmsg.genesisOrMintQuantity);
                                        this.cachedValidations[txid].parents.push({
                                            txid: txn.inputs[i].prevTxId.toString("hex"),
                                            vout: txn.inputs[i].outputIndex,
                                            versionType: input_slpmsg.versionType,
                                            valid: null,
                                            inputQty: input_slpmsg.genesisOrMintQuantity
                                        });
                                    }
                                }
                            }
                        }
                        catch (_) { }
                        _b.label = 22;
                    case 22:
                        i++;
                        return [3 /*break*/, 20];
                    case 23:
                        // Check token inputs are greater than token outputs (includes valid and invalid inputs)
                        if (tokenOutQty.isGreaterThan(tokenInQty)) {
                            this.cachedValidations[txid].validity = false;
                            this.cachedValidations[txid].waiting = false;
                            this.cachedValidations[txid].invalidReason = "Token outputs are greater than possible token inputs.";
                            return [2 /*return*/, this.cachedValidations[txid].validity];
                        }
                        _b.label = 24;
                    case 24:
                        parentTxids = __spread(new Set(this.cachedValidations[txid].parents.map(function (p) { return p.txid; })));
                        _loop_1 = function (id) {
                            var valid;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this_1.isValidSlpTxid(id)];
                                    case 1:
                                        valid = _a.sent();
                                        this_1.cachedValidations[txid].parents.filter(function (p) { return p.txid === id; }).map(function (p) { return p.valid = valid; });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _b.label = 25;
                    case 25:
                        _b.trys.push([25, 30, 31, 32]);
                        parentTxids_1 = __values(parentTxids), parentTxids_1_1 = parentTxids_1.next();
                        _b.label = 26;
                    case 26:
                        if (!!parentTxids_1_1.done) return [3 /*break*/, 29];
                        id = parentTxids_1_1.value;
                        return [5 /*yield**/, _loop_1(id)];
                    case 27:
                        _b.sent();
                        _b.label = 28;
                    case 28:
                        parentTxids_1_1 = parentTxids_1.next();
                        return [3 /*break*/, 26];
                    case 29: return [3 /*break*/, 32];
                    case 30:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 32];
                    case 31:
                        try {
                            if (parentTxids_1_1 && !parentTxids_1_1.done && (_a = parentTxids_1.return)) _a.call(parentTxids_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 32:
                        // Check MINT for exactly 1 valid MINT baton
                        if (this.cachedValidations[txid].details.transactionType === index_1.SlpTransactionType.MINT) {
                            if (this.cachedValidations[txid].parents.filter(function (p) { return p.valid && p.inputQty === null; }).length !== 1) {
                                this.cachedValidations[txid].validity = false;
                                this.cachedValidations[txid].waiting = false;
                                this.cachedValidations[txid].invalidReason = "MINT transaction with invalid baton parent.";
                                return [2 /*return*/, this.cachedValidations[txid].validity];
                            }
                        }
                        // Check valid inputs are greater than token outputs
                        if (this.cachedValidations[txid].details.transactionType === index_1.SlpTransactionType.SEND) {
                            validInputQty = this.cachedValidations[txid].parents.reduce(function (t, v) { return v.valid ? t.plus(v.inputQty) : t; }, new bignumber_js_1.default(0));
                            tokenOutQty = slpmsg.sendOutputs.reduce(function (t, v) { return t.plus(v); }, new bignumber_js_1.default(0));
                            if (tokenOutQty.isGreaterThan(validInputQty)) {
                                this.cachedValidations[txid].validity = false;
                                this.cachedValidations[txid].waiting = false;
                                this.cachedValidations[txid].invalidReason = "Token outputs are greater than valid token inputs.";
                                return [2 /*return*/, this.cachedValidations[txid].validity];
                            }
                        }
                        // Check versionType is not different from valid parents
                        if (this.cachedValidations[txid].parents.filter(function (p) { return p.valid; }).length > 0) {
                            validVersionType = this.cachedValidations[txid].parents.find(function (p) { return p.valid; }).versionType;
                            if (this.cachedValidations[txid].details.versionType !== validVersionType) {
                                this.cachedValidations[txid].validity = false;
                                this.cachedValidations[txid].waiting = false;
                                this.cachedValidations[txid].invalidReason = "SLP version/type mismatch from valid parent.";
                                return [2 /*return*/, this.cachedValidations[txid].validity];
                            }
                        }
                        this.cachedValidations[txid].validity = true;
                        this.cachedValidations[txid].waiting = false;
                        return [2 /*return*/, this.cachedValidations[txid].validity];
                }
            });
        });
    };
    LocalValidator.prototype.validateSlpTransactions = function (txids) {
        return __awaiter(this, void 0, void 0, function () {
            var res, i, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        res = [];
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < txids.length)) return [3 /*break*/, 4];
                        _b = (_a = res).push;
                        return [4 /*yield*/, this.isValidSlpTxid(txids[i])];
                    case 2:
                        _b.apply(_a, [(_c.sent()) ? txids[i] : ""]);
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, res.filter(function (id) { return id.length > 0; })];
                }
            });
        });
    };
    return LocalValidator;
}());
exports.LocalValidator = LocalValidator;
//# sourceMappingURL=localvalidator.js.map
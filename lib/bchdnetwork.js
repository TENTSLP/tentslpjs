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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BchdNetwork = void 0;
var bchaddr = __importStar(require("bchaddrjs-slp"));
var Bitcore = __importStar(require("bitcore-lib-cash"));
var _ = __importStar(require("lodash"));
var index_1 = require("../index");
var slp_1 = require("./slp");
var transactionhelpers_1 = require("./transactionhelpers");
var utils_1 = require("./utils");
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var BchdNetwork = /** @class */ (function () {
    function BchdNetwork(_a) {
        var BITBOX = _a.BITBOX, validator = _a.validator, logger = _a.logger, client = _a.client;
        this.logger = { log: function (s) { return null; } };
        if (!BITBOX) {
            throw Error("Must provide BITBOX instance to class constructor.");
        }
        if (!client) {
            throw Error("Must provide instance of GrpClient to class constructor.");
        }
        if (logger) {
            this.logger = logger;
        }
        this.validator = validator;
        this.BITBOX = BITBOX;
        this.client = client;
        this.slp = new slp_1.Slp(BITBOX);
        this.txnHelpers = new transactionhelpers_1.TransactionHelpers(this.slp);
    }
    BchdNetwork.prototype.getTokenInformation = function (txid, decimalConversion) {
        if (decimalConversion === void 0) { decimalConversion = false; }
        return __awaiter(this, void 0, void 0, function () {
            var txhex, _a, _b, txn, slpMsg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = Buffer).from;
                        return [4 /*yield*/, this.client.getRawTransaction({ hash: txid, reversedHashOrder: true })];
                    case 1:
                        txhex = _b.apply(_a, [(_c.sent()).getTransaction_asU8()]);
                        txn = new Bitcore.Transaction(txhex);
                        slpMsg = this.slp.parseSlpOutputScript(txn.outputs[0]._scriptBuffer);
                        if (decimalConversion) {
                            if ([index_1.SlpTransactionType.GENESIS, index_1.SlpTransactionType.MINT].includes(slpMsg.transactionType)) {
                                slpMsg.genesisOrMintQuantity = slpMsg.genesisOrMintQuantity.dividedBy(Math.pow(10, slpMsg.decimals));
                            }
                            else {
                                slpMsg.sendOutputs.map(function (o) { return o.dividedBy(Math.pow(10, slpMsg.decimals)); });
                            }
                        }
                        if (index_1.SlpTransactionType.GENESIS === slpMsg.transactionType) {
                            slpMsg.tokenIdHex = txid;
                        }
                        return [2 /*return*/, slpMsg];
                }
            });
        });
    };
    BchdNetwork.prototype.getTransactionDetails = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTransactionDetailsWithRetry([txid], 1)];
                    case 1:
                        res = _a.sent();
                        if (!res) {
                            return [2 /*return*/, res];
                        }
                        return [2 /*return*/, res[0]];
                }
            });
        });
    };
    BchdNetwork.prototype.getUtxos = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var cashAddress, legacyAddress, res, scriptPubKey, bestHeight, utxos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // must be a cash or legacy addr
                        if (!bchaddr.isCashAddress(address) && !bchaddr.isLegacyAddress(address)) {
                            throw new Error("Not an a valid address format, must be cashAddr or Legacy address format.");
                        }
                        cashAddress = bchaddr.toCashAddress(address);
                        legacyAddress = bchaddr.toLegacyAddress(address);
                        return [4 /*yield*/, this.client.getAddressUtxos({ address: address, includeMempool: true })];
                    case 1:
                        res = (_a.sent()).getOutputsList();
                        if (res.length === 0) {
                            return [2 /*return*/, {
                                    cashAddress: cashAddress,
                                    legacyAddress: legacyAddress,
                                    scriptPubKey: null,
                                    utxos: [],
                                }];
                        }
                        scriptPubKey = Buffer.from(res[0].getPubkeyScript_asU8()).toString("hex");
                        return [4 /*yield*/, this.client.getBlockchainInfo()];
                    case 2:
                        bestHeight = (_a.sent()).getBestHeight();
                        utxos = [];
                        if (res.length > 0) {
                            utxos = res.map(function (txo) {
                                return {
                                    satoshis: txo.getValue(),
                                    height: txo.getBlockHeight() < 2147483647 ? txo.getBlockHeight() : -1,
                                    confirmations: txo.getBlockHeight() < 2147483647 ? bestHeight - txo.getBlockHeight() + 1 : null,
                                    txid: Buffer.from(txo.getOutpoint().getHash_asU8().reverse()).toString("hex"),
                                    vout: txo.getOutpoint().getIndex(),
                                    amount: txo.getValue() / Math.pow(10, 8),
                                };
                            });
                        }
                        return [2 /*return*/, {
                                cashAddress: cashAddress,
                                legacyAddress: legacyAddress,
                                scriptPubKey: scriptPubKey,
                                utxos: utxos,
                            }];
                }
            });
        });
    };
    BchdNetwork.prototype.getAllSlpBalancesAndUtxos = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var result, results, address_1, address_1_1, addr, utxos, _a, _b, _c, e_1_1;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!(typeof address === "string")) return [3 /*break*/, 2];
                        address = bchaddr.toCashAddress(address);
                        return [4 /*yield*/, this.getUtxoWithTxDetails(address)];
                    case 1:
                        result = _e.sent();
                        return [2 /*return*/, this.processUtxosForSlp(result)];
                    case 2:
                        address = address.map(function (a) { return bchaddr.toCashAddress(a); });
                        results = [];
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 9, 10, 11]);
                        address_1 = __values(address), address_1_1 = address_1.next();
                        _e.label = 4;
                    case 4:
                        if (!!address_1_1.done) return [3 /*break*/, 8];
                        addr = address_1_1.value;
                        return [4 /*yield*/, this.getUtxoWithTxDetails(addr)];
                    case 5:
                        utxos = _e.sent();
                        _b = (_a = results).push;
                        _c = { address: utils_1.Utils.toSlpAddress(addr) };
                        return [4 /*yield*/, this.processUtxosForSlp(utxos)];
                    case 6:
                        _b.apply(_a, [(_c.result = _e.sent(), _c)]);
                        _e.label = 7;
                    case 7:
                        address_1_1 = address_1.next();
                        return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (address_1_1 && !address_1_1.done && (_d = address_1.return)) _d.call(address_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/, results];
                }
            });
        });
    };
    // Sent SLP tokens to a single output address with change handled
    // (Warning: Sweeps all BCH/SLP UTXOs for the funding address)
    BchdNetwork.prototype.simpleTokenSend = function (tokenId, sendAmounts, inputUtxos, tokenReceiverAddresses, changeReceiverAddress, requiredNonTokenOutputs) {
        if (requiredNonTokenOutputs === void 0) { requiredNonTokenOutputs = []; }
        return __awaiter(this, void 0, void 0, function () {
            var txHex;
            return __generator(this, function (_a) {
                txHex = this.txnHelpers.simpleTokenSend({
                    tokenId: tokenId, sendAmounts: sendAmounts, inputUtxos: inputUtxos, tokenReceiverAddresses: tokenReceiverAddresses,
                    changeReceiverAddress: changeReceiverAddress, requiredNonTokenOutputs: requiredNonTokenOutputs,
                });
                if (!inputUtxos.every(function (i) { return typeof i.wif === "string"; })) {
                    throw Error("The BitboxNetwork version of this method requires a private key WIF be provided with each input." +
                        "If you want more control over the signing process use Slp.simpleTokenSend() to get the unsigned transaction," +
                        "then after the transaction is signed you can use BitboxNetwork.sendTx()");
                }
                return [2 /*return*/, this.sendTx(txHex)];
            });
        });
    };
    BchdNetwork.prototype.simpleBchSend = function (sendAmounts, inputUtxos, bchReceiverAddresses, changeReceiverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var genesisTxHex;
            return __generator(this, function (_a) {
                genesisTxHex = this.txnHelpers.simpleBchSend({
                    sendAmounts: sendAmounts, inputUtxos: inputUtxos, bchReceiverAddresses: bchReceiverAddresses, changeReceiverAddress: changeReceiverAddress,
                });
                return [2 /*return*/, this.sendTx(genesisTxHex)];
            });
        });
    };
    BchdNetwork.prototype.simpleTokenGenesis = function (tokenName, tokenTicker, tokenAmount, documentUri, documentHash, decimals, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress, inputUtxos) {
        return __awaiter(this, void 0, void 0, function () {
            var genesisTxHex;
            return __generator(this, function (_a) {
                genesisTxHex = this.txnHelpers.simpleTokenGenesis({
                    tokenName: tokenName, tokenTicker: tokenTicker, tokenAmount: tokenAmount, documentUri: documentUri, documentHash: documentHash, decimals: decimals,
                    tokenReceiverAddress: tokenReceiverAddress, batonReceiverAddress: batonReceiverAddress, bchChangeReceiverAddress: bchChangeReceiverAddress, inputUtxos: inputUtxos,
                });
                return [2 /*return*/, this.sendTx(genesisTxHex)];
            });
        });
    };
    BchdNetwork.prototype.simpleNFT1ParentGenesis = function (tokenName, tokenTicker, tokenAmount, documentUri, documentHash, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress, inputUtxos, decimals) {
        if (decimals === void 0) { decimals = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var genesisTxHex;
            return __generator(this, function (_a) {
                genesisTxHex = this.txnHelpers.simpleNFT1ParentGenesis({
                    tokenName: tokenName, tokenTicker: tokenTicker, tokenAmount: tokenAmount, documentUri: documentUri, documentHash: documentHash,
                    tokenReceiverAddress: tokenReceiverAddress, batonReceiverAddress: batonReceiverAddress, bchChangeReceiverAddress: bchChangeReceiverAddress, inputUtxos: inputUtxos, decimals: decimals,
                });
                return [2 /*return*/, this.sendTx(genesisTxHex)];
            });
        });
    };
    BchdNetwork.prototype.simpleNFT1ChildGenesis = function (nft1GroupId, tokenName, tokenTicker, documentUri, documentHash, tokenReceiverAddress, bchChangeReceiverAddress, inputUtxos, allowBurnAnyAmount) {
        if (allowBurnAnyAmount === void 0) { allowBurnAnyAmount = false; }
        return __awaiter(this, void 0, void 0, function () {
            var genesisTxHex, burn;
            return __generator(this, function (_a) {
                genesisTxHex = this.txnHelpers.simpleNFT1ChildGenesis({
                    nft1GroupId: nft1GroupId, tokenName: tokenName, tokenTicker: tokenTicker, documentUri: documentUri, documentHash: documentHash, tokenReceiverAddress: tokenReceiverAddress,
                    bchChangeReceiverAddress: bchChangeReceiverAddress, inputUtxos: inputUtxos, allowBurnAnyAmount: allowBurnAnyAmount,
                });
                burn = {
                    tokenId: Buffer.from(nft1GroupId, "hex"),
                    tokenType: 129,
                    amount: allowBurnAnyAmount ? inputUtxos[0].slpUtxoJudgementAmount.toFixed() : "1",
                    outpointHash: Buffer.from(Buffer.from(inputUtxos[0].txid, "hex").reverse()),
                    outpointVout: inputUtxos[0].vout
                };
                return [2 /*return*/, this.sendTx(genesisTxHex, [burn])];
            });
        });
    };
    // Sent SLP tokens to a single output address with change handled
    // (Warning: Sweeps all BCH/SLP UTXOs for the funding address)
    BchdNetwork.prototype.simpleTokenMint = function (tokenId, mintAmount, inputUtxos, tokenReceiverAddress, batonReceiverAddress, changeReceiverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var txHex;
            return __generator(this, function (_a) {
                txHex = this.txnHelpers.simpleTokenMint({
                    tokenId: tokenId, mintAmount: mintAmount, inputUtxos: inputUtxos, tokenReceiverAddress: tokenReceiverAddress, batonReceiverAddress: batonReceiverAddress, changeReceiverAddress: changeReceiverAddress,
                });
                return [2 /*return*/, this.sendTx(txHex)];
            });
        });
    };
    // Burn a precise quantity of SLP tokens with remaining tokens (change) sent to a
    // single output address (Warning: Sweeps all BCH/SLP UTXOs for the funding address)
    BchdNetwork.prototype.simpleTokenBurn = function (tokenId, burnAmount, inputUtxos, changeReceiverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var txHex;
            return __generator(this, function (_a) {
                txHex = this.txnHelpers.simpleTokenBurn({
                    tokenId: tokenId, burnAmount: burnAmount, inputUtxos: inputUtxos, changeReceiverAddress: changeReceiverAddress,
                });
                return [2 /*return*/, this.sendTx(txHex)];
            });
        });
    };
    BchdNetwork.prototype.getUtxoWithRetry = function (address, retries) {
        if (retries === void 0) { retries = 40; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getUtxos(address)];
            });
        });
    };
    BchdNetwork.prototype.getUtxoWithTxDetails = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var res, utxos, txIds, txDetails;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUtxos(address)];
                    case 1:
                        res = _a.sent();
                        utxos = utils_1.Utils.mapToSlpAddressUtxoResultArray(res);
                        txIds = utxos.map(function (i) { return i.txid; });
                        if (txIds.length === 0) {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, Promise.all(_.chunk(txIds, 20).map(function (txids) {
                                return _this.getTransactionDetailsWithRetry(__spread(new Set(txids)));
                            }))];
                    case 2:
                        txDetails = (_a.sent());
                        // concat the chunked arrays
                        txDetails = [].concat.apply([], __spread(txDetails));
                        utxos = utxos.map(function (i) { i.tx = txDetails.find(function (d) { return d.txid === i.txid; }); return i; });
                        return [2 /*return*/, utxos];
                }
            });
        });
    };
    BchdNetwork.prototype.getTransactionDetailsWithRetry = function (txids, retries) {
        if (retries === void 0) { retries = 40; }
        return __awaiter(this, void 0, void 0, function () {
            var results, count, txids_1, txids_1_1, txid, res, e_2_1, txns, txns_1, txns_1_1, txn, _a, _1, _b, _c, e_3_1;
            var e_2, _d, e_3, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        results = [];
                        count = 0;
                        _f.label = 1;
                    case 1:
                        if (!(results.length !== txids.length)) return [3 /*break*/, 25];
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 7, 8, 9]);
                        txids_1 = (e_2 = void 0, __values(txids)), txids_1_1 = txids_1.next();
                        _f.label = 3;
                    case 3:
                        if (!!txids_1_1.done) return [3 /*break*/, 6];
                        txid = txids_1_1.value;
                        return [4 /*yield*/, this.client
                                .getTransaction({ hash: txid, reversedHashOrder: true })];
                    case 4:
                        res = (_f.sent())
                            .getTransaction();
                        if (res) {
                            results.push(res);
                        }
                        _f.label = 5;
                    case 5:
                        txids_1_1 = txids_1.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_2_1 = _f.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (txids_1_1 && !txids_1_1.done && (_d = txids_1.return)) _d.call(txids_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 9:
                        if (!(results.length === txids.length)) return [3 /*break*/, 23];
                        txns = void 0;
                        txns = results.map(function (res) {
                            return {
                                txid: Buffer.from(res.getHash_asU8().reverse()).toString("hex"),
                                version: res.getVersion(),
                                locktime: res.getLockTime(),
                                vin: res.getInputsList().map(function (i) {
                                    return {
                                        n: i.getIndex(),
                                        sequence: i.getSequence(),
                                        coinbase: null,
                                    };
                                }),
                                vout: res.getOutputsList().map(function (o) {
                                    return {
                                        value: o.getValue(),
                                        n: o.getIndex(),
                                        scriptPubKey: {
                                            hex: Buffer.from(o.getPubkeyScript_asU8()).toString("hex"),
                                            asm: o.getDisassembledScript(),
                                        },
                                    };
                                }),
                                time: res.getTimestamp(),
                                blockhash: Buffer.from(res.getBlockHash_asU8().reverse()).toString("hex"),
                                blockheight: res.getBlockHeight(),
                                isCoinBase: false,
                                valueOut: res.getOutputsList().reduce(function (p, o) { return p += o.getValue(); }, 0),
                                size: res.getSize(),
                            };
                        });
                        _f.label = 10;
                    case 10:
                        _f.trys.push([10, 20, 21, 22]);
                        txns_1 = (e_3 = void 0, __values(txns)), txns_1_1 = txns_1.next();
                        _f.label = 11;
                    case 11:
                        if (!!txns_1_1.done) return [3 /*break*/, 19];
                        txn = txns_1_1.value;
                        // add slp address format to transaction details
                        txn.vin.forEach(function (input) {
                            try {
                                input.slpAddress = utils_1.Utils.toSlpAddress(input.legacyAddress);
                            }
                            catch (_) { }
                        });
                        txn.vout.forEach(function (output) {
                            try {
                                output.scriptPubKey.slpAddrs = [utils_1.Utils.toSlpAddress(output.scriptPubKey.cashAddrs[0])];
                            }
                            catch (_) { }
                        });
                        _f.label = 12;
                    case 12:
                        _f.trys.push([12, 14, , 15]);
                        _a = txn;
                        return [4 /*yield*/, this.getTokenInformation(txn.txid, true)];
                    case 13:
                        _a.tokenInfo = _f.sent();
                        return [3 /*break*/, 15];
                    case 14:
                        _1 = _f.sent();
                        txn.tokenIsValid = false;
                        return [3 /*break*/, 18];
                    case 15:
                        _b = txn;
                        return [4 /*yield*/, this.isValidSlpTxid(txn.txid)];
                    case 16:
                        _b.tokenIsValid = _f.sent();
                        if (!(txn.tokenIsValid && txn.tokenInfo.versionType === index_1.SlpVersionType.TokenVersionType1_NFT_Child)) return [3 /*break*/, 18];
                        _c = txn;
                        return [4 /*yield*/, this.getNftParentId(txn.tokenInfo.tokenIdHex)];
                    case 17:
                        _c.tokenNftParentId = _f.sent();
                        _f.label = 18;
                    case 18:
                        txns_1_1 = txns_1.next();
                        return [3 /*break*/, 11];
                    case 19: return [3 /*break*/, 22];
                    case 20:
                        e_3_1 = _f.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 22];
                    case 21:
                        try {
                            if (txns_1_1 && !txns_1_1.done && (_e = txns_1.return)) _e.call(txns_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 22: return [2 /*return*/, txns];
                    case 23:
                        count++;
                        if (count > retries) {
                            throw new Error("gRPC client.getTransaction endpoint experienced a problem");
                        }
                        return [4 /*yield*/, sleep(250)];
                    case 24:
                        _f.sent();
                        return [3 /*break*/, 1];
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    BchdNetwork.prototype.getAddressDetailsWithRetry = function (address, retries) {
        if (retries === void 0) { retries = 40; }
        return __awaiter(this, void 0, void 0, function () {
            var utxos, balance, utxosMempool, mempoolBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // must be a cash or legacy addr
                        if (!bchaddr.isCashAddress(address) && !bchaddr.isLegacyAddress(address)) {
                            throw new Error("Not an a valid address format, must be cashAddr or Legacy address format.");
                        }
                        return [4 /*yield*/, this.client.getAddressUtxos({ address: address, includeMempool: false })];
                    case 1:
                        utxos = (_a.sent()).getOutputsList();
                        balance = utxos.reduce(function (p, o) { return o.getValue(); }, 0);
                        return [4 /*yield*/, this.client.getAddressUtxos({ address: address, includeMempool: true })];
                    case 2:
                        utxosMempool = (_a.sent()).getOutputsList();
                        mempoolBalance = utxosMempool.reduce(function (p, o) { return o.getValue(); }, 0);
                        return [2 /*return*/, {
                                balance: balance,
                                balanceSat: balance * Math.pow(10, 8),
                                totalReceived: null,
                                totalReceivedSat: null,
                                totalSent: null,
                                totalSentSat: null,
                                unconfirmedBalance: mempoolBalance - balance,
                                unconfirmedBalanceSat: mempoolBalance * Math.pow(10, 8) - balance * Math.pow(10, 8),
                                unconfirmedTxAppearances: null,
                                txAppearances: null,
                                transactions: null,
                                legacyAddress: bchaddr.toLegacyAddress(address),
                                cashAddress: bchaddr.toCashAddress(address),
                                slpAddress: bchaddr.toSlpAddress(address),
                            }];
                }
            });
        });
    };
    BchdNetwork.prototype.sendTx = function (hex, slpBurns, suppressWarnings) {
        if (suppressWarnings === void 0) { suppressWarnings = false; }
        return __awaiter(this, void 0, void 0, function () {
            var txn, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.client.submitTransaction({
                                txnHex: hex,
                                requiredSlpBurns: slpBurns,
                            })];
                    case 1:
                        txn = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        if (err_1.message.includes("BCHD instance does not have SLP indexing enabled")) {
                            if (!suppressWarnings) {
                                console.log(err_1.message);
                            }
                        }
                        else {
                            throw err_1;
                        }
                        return [3 /*break*/, 3];
                    case 3:
                        if (!!txn) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.client.submitTransaction({
                                txnHex: hex,
                                skipSlpValidityChecks: true
                            })];
                    case 4:
                        txn = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, Buffer.from(txn.getHash_asU8().reverse()).toString("hex")];
                }
            });
        });
    };
    BchdNetwork.prototype.monitorForPayment = function (paymentAddress, fee, onPaymentCB) {
        return __awaiter(this, void 0, void 0, function () {
            var utxo, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // must be a cash or legacy addr
                        if (!bchaddr.isCashAddress(paymentAddress) && !bchaddr.isLegacyAddress(paymentAddress)) {
                            throw new Error("Not an a valid address format, must be cashAddr or Legacy address format.");
                        }
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.getUtxos(paymentAddress)];
                    case 3:
                        utxo = _a.sent();
                        if (utxo && utxo.utxos[0].satoshis >= fee) {
                            return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        ex_1 = _a.sent();
                        console.log(ex_1);
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, sleep(2000)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 7:
                        onPaymentCB();
                        return [2 /*return*/];
                }
            });
        });
    };
    BchdNetwork.prototype.processUtxosForSlp = function (utxos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.slp.processUtxosForSlpAbstract(utxos, this)];
            });
        });
    };
    BchdNetwork.prototype.getRawTransactions = function (txids) {
        return __awaiter(this, void 0, void 0, function () {
            var getTxnHex;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.validator && this.validator.getRawTransactions) {
                    return [2 /*return*/, this.validator.getRawTransactions(txids)];
                }
                getTxnHex = function (txid) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = Buffer).from;
                                return [4 /*yield*/, this.client
                                        .getRawTransaction({ hash: txid, reversedHashOrder: true })];
                            case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent())
                                        .getTransaction_asU8()]).toString("hex")];
                        }
                    });
                }); };
                return [2 /*return*/, Promise.all(txids.map(function (txid) { return getTxnHex(txid); }))];
            });
        });
    };
    BchdNetwork.prototype.isValidSlpTxid = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.validator.isValidSlpTxid(txid, null, null, this.logger)];
            });
        });
    };
    BchdNetwork.prototype.validateSlpTransactions = function (txids) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.validator.validateSlpTransactions(txids)];
            });
        });
    };
    BchdNetwork.prototype.getNftParentId = function (tokenIdHex) {
        return __awaiter(this, void 0, void 0, function () {
            var txnhex, tx, nftBurnTxnHex, nftBurnTxn, slp, nftBurnSlp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getRawTransactions([tokenIdHex])];
                    case 1:
                        txnhex = (_a.sent())[0];
                        tx = index_1.Primatives.Transaction.parseFromBuffer(Buffer.from(txnhex, "hex"));
                        return [4 /*yield*/, this.getRawTransactions([tx.inputs[0].previousTxHash])];
                    case 2:
                        nftBurnTxnHex = (_a.sent())[0];
                        nftBurnTxn = index_1.Primatives.Transaction.parseFromBuffer(Buffer.from(nftBurnTxnHex, "hex"));
                        slp = new slp_1.Slp(this.BITBOX);
                        nftBurnSlp = slp.parseSlpOutputScript(Buffer.from(nftBurnTxn.outputs[0].scriptPubKey));
                        if (nftBurnSlp.transactionType === index_1.SlpTransactionType.GENESIS) {
                            return [2 /*return*/, tx.inputs[0].previousTxHash];
                        }
                        else {
                            return [2 /*return*/, nftBurnSlp.tokenIdHex];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return BchdNetwork;
}());
exports.BchdNetwork = BchdNetwork;
//# sourceMappingURL=bchdnetwork.js.map
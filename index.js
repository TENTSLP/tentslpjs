"use strict";
/// <reference path="./lib/vendors.d.ts"/>
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlpAddressUtxoResult = exports.SlpUtxoJudgement = exports.SlpVersionType = exports.SlpTransactionType = exports.bitcore = void 0;
__exportStar(require("./lib/slp"), exports);
__exportStar(require("./lib/utils"), exports);
__exportStar(require("./lib/primatives"), exports);
__exportStar(require("./lib/bitdbnetwork"), exports);
__exportStar(require("./lib/localvalidator"), exports);
__exportStar(require("./lib/bitboxnetwork"), exports);
__exportStar(require("./lib/transactionhelpers"), exports);
var bitcore = __importStar(require("bitcore-lib-cash"));
exports.bitcore = bitcore;
var SlpTransactionType;
(function (SlpTransactionType) {
    SlpTransactionType["GENESIS"] = "GENESIS";
    SlpTransactionType["MINT"] = "MINT";
    SlpTransactionType["SEND"] = "SEND";
})(SlpTransactionType = exports.SlpTransactionType || (exports.SlpTransactionType = {}));
var SlpVersionType;
(function (SlpVersionType) {
    SlpVersionType[SlpVersionType["TokenVersionType1"] = 1] = "TokenVersionType1";
    SlpVersionType[SlpVersionType["TokenVersionType1_NFT_Child"] = 65] = "TokenVersionType1_NFT_Child";
    SlpVersionType[SlpVersionType["TokenVersionType1_NFT_Parent"] = 129] = "TokenVersionType1_NFT_Parent";
})(SlpVersionType = exports.SlpVersionType || (exports.SlpVersionType = {}));
// negative values are bad, 0 = NOT_SLP, positive values are a SLP (token or baton)
var SlpUtxoJudgement;
(function (SlpUtxoJudgement) {
    SlpUtxoJudgement["UNKNOWN"] = "UNKNOWN";
    SlpUtxoJudgement["INVALID_BATON_DAG"] = "INVALID_BATON_DAG";
    SlpUtxoJudgement["INVALID_TOKEN_DAG"] = "INVALID_TOKEN_DAG";
    SlpUtxoJudgement["NOT_SLP"] = "NOT_SLP";
    SlpUtxoJudgement["SLP_TOKEN"] = "SLP_TOKEN";
    SlpUtxoJudgement["SLP_BATON"] = "SLP_BATON";
    SlpUtxoJudgement["UNSUPPORTED_TYPE"] = "UNSUPPORTED_TYPE";
})(SlpUtxoJudgement = exports.SlpUtxoJudgement || (exports.SlpUtxoJudgement = {}));
var SlpAddressUtxoResult = /** @class */ (function () {
    function SlpAddressUtxoResult() {
        this.slpUtxoJudgement = SlpUtxoJudgement.UNKNOWN;
    }
    return SlpAddressUtxoResult;
}());
exports.SlpAddressUtxoResult = SlpAddressUtxoResult;
//# sourceMappingURL=index.js.map
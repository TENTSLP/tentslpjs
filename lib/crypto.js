"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var Crypto = /** @class */ (function () {
    function Crypto() {
    }
    Crypto.sha256 = function (buffer) {
        var words = crypto_js_1.default.enc.Hex.parse(buffer.toString("hex"));
        var hash = crypto_js_1.default.SHA256(words);
        return Buffer.from(hash.toString(crypto_js_1.default.enc.Hex), "hex");
    };
    Crypto.hash256 = function (buffer) {
        return this.sha256(this.sha256(buffer));
    };
    Crypto.txid = function (buffer) {
        return Buffer.from(this.hash256(buffer).reverse());
    };
    return Crypto;
}());
exports.Crypto = Crypto;
//# sourceMappingURL=crypto.js.map
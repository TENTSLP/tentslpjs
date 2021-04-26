"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlpTokenType1 = void 0;
var slp_mdm_1 = require("slp-mdm");
var SlpTokenType1 = /** @class */ (function () {
    function SlpTokenType1() {
    }
    Object.defineProperty(SlpTokenType1, "lokadIdHex", {
        get: function () { return "534c5000"; },
        enumerable: false,
        configurable: true
    });
    SlpTokenType1.buildGenesisOpReturn = function (ticker, name, documentUrl, documentHashHex, decimals, batonVout, initialQuantity, type) {
        if (type === void 0) { type = 0x01; }
        if (decimals === null || decimals === undefined) {
            throw Error("Decimals property must be in range 0 to 9");
        }
        if (ticker !== null && typeof ticker !== "string") {
            throw Error("ticker must be a string");
        }
        if (name !== null && typeof name !== "string") {
            throw Error("name must be a string");
        }
        var res;
        switch (type) {
            case 0x01:
                res = slp_mdm_1.TokenType1.genesis(ticker || "", name || "", documentUrl || "", documentHashHex || "", decimals || 0, batonVout, initialQuantity);
                break;
            case 0x41:
                if (!initialQuantity.isEqualTo(1)) {
                    throw Error("nft1 child output quantity must be equal to 1");
                }
                res = slp_mdm_1.NFT1.Child.genesis(ticker || "", name || "", documentUrl || "", documentHashHex || "");
                break;
            case 0x81:
                res = slp_mdm_1.NFT1.Group.genesis(ticker || "", name || "", documentUrl || "", documentHashHex || "", decimals || 0, batonVout, initialQuantity);
                break;
            default:
                throw Error("unsupported token type");
        }
        if (res.length > 223) {
            throw Error("Script too long, must be less than or equal to 223 bytes.");
        }
        return res;
    };
    SlpTokenType1.buildSendOpReturn = function (tokenIdHex, outputQtyArray, type) {
        if (type === void 0) { type = 0x01; }
        switch (type) {
            case 0x01:
                return slp_mdm_1.TokenType1.send(tokenIdHex, outputQtyArray);
            case 0x41:
                if (outputQtyArray.length !== 1) {
                    throw Error("nft1 child must have exactly 1 output quantity");
                }
                if (!outputQtyArray[0].isEqualTo(1)) {
                    throw Error("nft1 child output quantity must be equal to 1");
                }
                return slp_mdm_1.NFT1.Child.send(tokenIdHex, outputQtyArray);
            case 0x81:
                return slp_mdm_1.NFT1.Group.send(tokenIdHex, outputQtyArray);
            default:
                throw Error("unsupported token type");
        }
    };
    SlpTokenType1.buildMintOpReturn = function (tokenIdHex, batonVout, mintQuantity, type) {
        if (type === void 0) { type = 0x01; }
        switch (type) {
            case 0x01:
                return slp_mdm_1.TokenType1.mint(tokenIdHex, batonVout, mintQuantity);
            case 0x41:
                throw Error("nft1 child cannot mint");
            case 0x81:
                return slp_mdm_1.NFT1.Group.mint(tokenIdHex, batonVout, mintQuantity);
            default:
                throw Error("unsupported token type");
        }
    };
    return SlpTokenType1;
}());
exports.SlpTokenType1 = SlpTokenType1;
//# sourceMappingURL=slptokentype1.js.map
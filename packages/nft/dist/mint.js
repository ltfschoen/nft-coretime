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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const assert_1 = __importDefault(require("assert"));
const sdk_1 = __importDefault(require("@unique-nft/sdk"));
const keyring_1 = require("@unique-nft/accounts/keyring");
function main() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const mnemonic = (_a = process.env.WALLET_SEED) !== null && _a !== void 0 ? _a : "";
        const account = yield keyring_1.KeyringProvider.fromMnemonic(mnemonic);
        const address = account.address;
        const sdk = new sdk_1.default({
            baseUrl: 'https://rest.unique.network/opal/v1',
            signer: account,
        });
        // console.log('sdk', sdk)
        ////////////////////////////////////
        // Create collection - quick simple way 
        ////////////////////////////////////
        const { parsed, error } = yield sdk.collection.create.submitWaitResult({
            address,
            name: 'Luke test collection',
            description: 'My test collection',
            tokenPrefix: 'TST',
        });
        console.log('parsed', parsed);
        if (error) {
            console.log('create collection error', error);
            process.exit();
        }
        const collectionId = parsed === null || parsed === void 0 ? void 0 : parsed.collectionId;
        console.log(`Collection created. Id: ${collectionId}`);
        console.log(`View this minted collection at https://uniquescan.io/opal/collections/${collectionId}`);
        const tokens = [
            {
                data: {
                    image: {
                        // e.g. https://ipfs.io/ipfs/QmYJDpmWyjDa3H6BxweFmQXk4fU8b1GU7M9EqYcaUNvXzc
                        ipfsCid: 'QmcAcH4F9HYQtpqKHxBFwGvkfKb8qckXj2YWUrcc8yd24G/image1.png',
                    },
                    name: {
                        _: 'My token',
                    },
                    description: {
                        _: 'Sample token',
                    },
                },
            }
        ];
        // https://docs.unique.network/about/limitations/limitations.html
        (0, assert_1.default)(tokens.length < 35, "The safe limit is 35 NFTs minted at once.");
        ////////////////////////////////////
        // Mint token(s)
        ////////////////////////////////////
        const result = yield sdk.token.createMultiple.submitWaitResult({
            address,
            collectionId,
            tokens: tokens,
        });
        console.log('result', result);
        const mintedTokensCount = (_b = result === null || result === void 0 ? void 0 : result.parsed) === null || _b === void 0 ? void 0 : _b.length;
        let currentTokenId;
        (_c = result.parsed) === null || _c === void 0 ? void 0 : _c.forEach((token, index) => {
            currentTokenId = token === null || token === void 0 ? void 0 : token.tokenId;
            console.log(`Minted token #${currentTokenId}/${mintedTokensCount} with token ID ${currentTokenId} in collection ${collectionId}`);
            console.log(`View this minted token at https://uniquescan.io/opal/tokens/${collectionId}/${currentTokenId}`);
        });
    });
}
main().catch((error) => {
    console.error(error);
});

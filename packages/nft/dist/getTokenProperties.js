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
const sdk_1 = __importDefault(require("@unique-nft/sdk"));
const keyring_1 = require("@unique-nft/accounts/keyring");
////////////////////////////////////
/// Instructions:
///   - Change `collectionId` value to the collection id that you deployed
///   - Change `tokenId` value to the token id in that collection (initial token id is 0)
///
/// For example, in this URL, https://uniquescan.io/opal/tokens/2677/1
/// the 2677 is the `collectionId` value and the `tokenId` value + 1.
////////////////////////////////////
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const mnemonic = (_a = process.env.WALLET_SEED) !== null && _a !== void 0 ? _a : "";
        const account = yield keyring_1.KeyringProvider.fromMnemonic(mnemonic);
        const address = account.address;
        const sdk = new sdk_1.default({
            baseUrl: 'https://rest.unique.network/opal/v1',
            signer: account,
        });
        console.log('sdk', sdk);
        ////////////////////////////////////
        // Add the collection ID and token ID below 
        ////////////////////////////////////
        const collectionId = 2677;
        const tokenId = 1;
        ////////////////////////////////////
        // Get collection token properties 
        ////////////////////////////////////
        const { properties } = yield sdk.token.properties({
            collectionId,
            tokenId,
        });
        if (properties === null || properties === void 0 ? void 0 : properties.length) {
            properties.forEach((prop) => {
                console.log(`The value of the key ${prop.key} is ${prop.value}`);
            });
        }
        else {
            console.log(`No properties`);
            process.exit();
        }
    });
}
main().catch((error) => {
    console.error(error);
});

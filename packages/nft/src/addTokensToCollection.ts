import dotenv from "dotenv";
dotenv.config();
import Sdk, { TokenId } from '@unique-nft/sdk'
import {KeyringProvider} from '@unique-nft/accounts/keyring'
import {
  CreateMultipleTokensArguments,
  UniqueCollectionSchemaToCreate,
  COLLECTION_SCHEMA_NAME,
  AttributeType,
} from '@unique-nft/substrate-client/tokens';

////////////////////////////////////
///
/// Add Tokens to Collection
///
/// https://docs.unique.network/reference/sdk-methods.html#overview-39
///
/// Instructions:
///   - Change `collectionId` value to the collection id that you deployed
///   - Change `tokenId` value to the token id in that collection (initial token id is 1)
///
/// For example, in this URL, https://uniquescan.io/opal/tokens/2677/1
/// the 2677 is the `collectionId` value and `1` is the `tokenId` value.
////////////////////////////////////
async function main() {
  const mnemonic = process.env.WALLET_SEED ?? ""
  const account = await KeyringProvider.fromMnemonic(mnemonic)
  const address = account.address

  const sdk = new Sdk({
    baseUrl: 'https://rest.unique.network/opal/v1', 
    signer: account,
  })
  console.log('sdk', sdk)

  ////////////////////////////////////
  // Add the collection ID and token ID below 
  ////////////////////////////////////
  const collectionId = 2691 as number
  const tokenId = 1

  ////////////////////////////////////
  // Add tokens to a collection
  ////////////////////////////////////
  const tokens = [ // array of tokens
    { // next
      data: {
        image: {
          // e.g. https://ipfs.io/ipfs/QmYJDpmWyjDa3H6BxweFmQXk4fU8b1GU7M9EqYcaUNvXzc
          ipfsCid: 'QmUisSsrD9S4qhEfrmvxfxPATVH49LU8ov5Y4MBoawaZR6', // valid IPFS CID
        },
        name: {
          _: 'Next Coretime NFT',
        },
        description: {
          _: 'Next Coretime NFT to commemorate initial sales',
        },
      },
    },
  ];

  const args: CreateMultipleTokensArguments = {
    address,
    collectionId,
    tokens: tokens,
  };
  
  const result = await sdk.token.createMultiple.submitWaitResult(args);
  if (result) {
    console.log(JSON.stringify(result, null, 2))
  } else {
    console.log(`Unable to create tokens for collection`)
    process.exit()
  }

  process.exit()
}

main().catch((error) => {
  console.error(error)
})
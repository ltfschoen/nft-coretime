import dotenv from "dotenv";
dotenv.config();
import assert from 'assert';
import Sdk, { CHAIN_CONFIG, TokenId } from '@unique-nft/sdk'
import {KeyringProvider} from '@unique-nft/accounts/keyring'

////////////////////////////////////
/// Instructions:
///   - Change `baseUrl` to the endpoint of the chain you want to connect to
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
    baseUrl: CHAIN_CONFIG.opal.restUrl,
    signer: account,
  })
  // console.log('sdk', sdk)

  ////////////////////////////////////
  // Create collection - quick simple way 
  ////////////////////////////////////
  const {parsed, error} = await sdk.collection.create.submitWaitResult({
    address,
    name: 'Luke test collection',
    description: 'My test collection',
    tokenPrefix: 'TST',
  })
  console.log('parsed', parsed)

  if (error) {
    console.log('create collection error', error)
    process.exit()
  }
  const collectionId = parsed?.collectionId as number
  console.log(`Collection created. Id: ${collectionId}`)
  console.log(`View this minted collection at https://uniquescan.io/opal/collections/${collectionId}`)

  const tokens = [ // array of tokens
    { // 1st token
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
  assert(tokens.length < 35, "The safe limit is 35 NFTs minted at once.");

  ////////////////////////////////////
  // Mint token(s)
  ////////////////////////////////////
  const result = await sdk.token.createMultiple.submitWaitResult({
    address,
    collectionId,
    tokens: tokens,
  })
  console.log('result', result)

  // Note: To get a hex-encoded payload, you can use .build. For example:
  //   const unsignedTxPayload = await sdk.token.create.build({
  //     collectionId: 2677,
  //   });

  const mintedTokensCount = result?.parsed?.length
  let currentTokenId;
  result.parsed?.forEach((token, index) => {
    currentTokenId = token?.tokenId as number
    console.log(`Minted token ID #${currentTokenId}/${mintedTokensCount} in collection ${collectionId}`)
    console.log(`View this minted token at https://uniquescan.io/opal/tokens/${collectionId}/${currentTokenId}`)
  });

  process.exit()
}

main().catch((error) => {
  console.error(error)
})

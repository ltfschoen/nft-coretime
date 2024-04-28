import dotenv from "dotenv";
dotenv.config();
import Sdk, { TokenId } from '@unique-nft/sdk'
import {KeyringProvider} from '@unique-nft/accounts/keyring'
import { TransferCollectionArguments } from '@unique-nft/substrate-client/tokens';

////////////////////////////////////
///
/// Transfer Collection
///
/// https://docs.unique.network/reference/sdk-methods.html#overview-12
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
  const collectionId = 2677 as number
  const tokenId = 1

  ////////////////////////////////////
  // Transfer collection from collection owner
  ////////////////////////////////////
  const args: TransferCollectionArguments = {
    collectionId,
    address,
    to: address,
  };
  const txTransfer = await sdk.collection.transfer.submitWaitResult(args)

  const parsedTransfer = txTransfer.parsed

  console.log(`${parsedTransfer?.owner} is the new owner of collection ${parsedTransfer?.collectionId}`)

  const txGetCollection = await sdk.collection.get({
    collectionId,
  })
  if (txGetCollection) {
    console.log('txGetCollection: ', JSON.stringify(txGetCollection, null, 2))
    console.log(`Collection # ${txGetCollection.id} is owned by this address: ${txGetCollection.owner}`)
  } else {
    console.log(`No collection found`)
    process.exit()
  }

  process.exit()
}

main().catch((error) => {
  console.error(error)
})
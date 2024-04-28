import dotenv from "dotenv";
dotenv.config();
import Sdk, { TokenId } from '@unique-nft/sdk'
import {KeyringProvider} from '@unique-nft/accounts/keyring'

////////////////////////////////////
///
/// Set Properties of Token in a Collection
///
/// https://docs.unique.network/build/sdk/tokens.html#set-token-properties
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
  // Set token properties 
  ////////////////////////////////////

  // The maximum number of keys is 64. The maximum size of a parameter data block (keys and values) is 40 kB
  // Keys cannot be removed after being added.
  // https://docs.unique.network/build/sdk/collections.html#set-collection-properties
  // https://docs.unique.network/reference/sdk-methods.html#overview-9
  const txSetProps = await sdk.token.setProperties.submitWaitResult({
    address,
    collectionId,
    tokenId,
    properties: [
      {
        key: 'foo',
        value: 'bar',
      },
    ],
  })

  ////////////////////////////////////
  // Show token properties that were set
  ////////////////////////////////////
  const properties = txSetProps.parsed?.properties

  if (properties?.length) {
    console.log(`The values of the [ ${properties.map((t) => t.propertyKey).join()} ] keys are set`)
  } else {
    console.log(`No properties were set`)
    process.exit()
  }

  console.log(`View the collection at https://uniquescan.io/opal/tokens/${collectionId}/${tokenId}`)
  console.log(`View the extrinsic tx at https://opal.subscan.io/account/${address}`)

  process.exit()
}

main().catch((error) => {
  console.error(error)
})

import dotenv from "dotenv";
dotenv.config();
import Sdk, { CHAIN_CONFIG, TokenId } from '@unique-nft/sdk'
import {KeyringProvider} from '@unique-nft/accounts/keyring'
import { TokenOwnerArguments,
  TokenOwnerResult,
  TransferArguments,
} from '@unique-nft/substrate-client/tokens';
import { AllowanceArguments } from '@unique-nft/substrate-client/tokens';

////////////////////////////////////
///
/// Transfer Token of a Collection
///
/// https://docs.unique.network/build/sdk/tokens.html#transfer-token
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
  console.log('address: ' + address)

  const sdk = new Sdk({
    baseUrl: CHAIN_CONFIG.quartz.restUrl, 
    signer: account,
  })
  console.log('sdk', sdk)

  ////////////////////////////////////
  // Add the collection ID and token ID below 
  ////////////////////////////////////
  const collectionId = 827 as number
  const tokenId = 1

  ////////////////////////////////////
  // Transfer token 
  ////////////////////////////////////

  // const args: TokenOwnerArguments = {
  //   collectionId: 827,
  //   tokenId: 1,
  //   // blockHashAt: '0xff19c2457fa4d7216cfad444615586c4365250e7310e2de7032ded4fcbd36873'
  // };
  
  // const result: TokenOwnerResult = await sdk.token.owner(
  //   args,
  // );
  // console.log('result', result)

  // const AllowanceArgs: AllowanceArguments = {
  //     from: '5Chai5UGBHXFrXXcHtDypVWdvHnjrny2rDtfa9RHbM3JGpCw',
  //     to: '5Chai5UGBHXFrXXcHtDypVWdvHnjrny2rDtfa9RHbM3JGpCw',
  //     collectionId: 827,
  //     tokenId: 1,
  // };
  
  // const { isAllowed } = await sdk.token.allowance(AllowanceArgs);
  // console.log('isAllowed', isAllowed)

  const args: TransferArguments = {
    collectionId,
    tokenId,
    address,
    to: "HTwmmHjH8ofGrHoKuJrFHciejdx4SRJw7vrqyUREDGeY7oF",
    from: address,
    // from: '', // optional `from` account
  };
  const txTransfer = await sdk.token.transfer.submitWaitResult(args)

  const parsedTransfer = txTransfer.parsed

  console.log(`${parsedTransfer?.to} is the new owner of token ${parsedTransfer?.tokenId} 
    from collection ${parsedTransfer?.collectionId}`)

  const txGetToken = await sdk.token.get({
    collectionId,
    tokenId,
  })

  if (txGetToken) {
    console.log(`Token: `, txGetToken)
    console.log(`Token # ${txGetToken.tokenId} is owned by this address: ${txGetToken.owner}`)
  } else {
    console.log(`No token found`)
    process.exit()
  }

  // Example output:
  /*
    Token:  {
      tokenId: 1,
      collectionId: 2677,
      owner: '5G7Jb5JeGV9SN9TUXLqWpxgmEt3o7bQtTNt1FMYgERTdULMf',
      attributes: {},
      image: { ipfsCid: '', fullUrl: '' },
      properties: [ { key: 'foo', value: 'bar', valueHex: '0x626172' } ],
      collection: {
        mode: 'NFT',
        decimals: 0,
        name: 'Luke test collection',
        description: 'My test collection',
        tokenPrefix: 'TST',
        sponsorship: null,
        limits: {
          accountTokenOwnershipLimit: null,
          sponsoredDataSize: null,
          sponsoredDataRateLimit: null,
          tokenLimit: null,
          sponsorTransferTimeout: null,
          sponsorApproveTimeout: null,
          ownerCanTransfer: null,
          ownerCanDestroy: null,
          transfersEnabled: null
        },
        readOnly: false,
        permissions: { access: 'Normal', mintMode: false, nesting: [Object] },
        id: 2677,
        owner: '5G7Jb5JeGV9SN9TUXLqWpxgmEt3o7bQtTNt1FMYgERTdULMf',
        properties: [],
        flags: { foreign: false, erc721metadata: false },
        tokenPropertyPermissions: [ [Object] ]
      },
      decodingError: null
    }
   */

  process.exit()
}

main().catch((error) => {
  console.error(error)
})
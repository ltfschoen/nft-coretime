import dotenv from "dotenv";
dotenv.config();
import Sdk, { CHAIN_CONFIG, TokenId } from '@unique-nft/sdk'
import {KeyringProvider} from '@unique-nft/accounts/keyring'
import { ApproveArguments } from '@unique-nft/substrate-client/tokens';

////////////////////////////////////
///
/// Approv Token Spender
///
/// https://docs.unique.network/reference/sdk-methods.html#other
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
  // Approve token spender
  ////////////////////////////////////

  const approvedSpender = 'HTwmmHjH8ofGrHoKuJrFHciejdx4SRJw7vrqyUREDGeY7oF'
  const approveArgs: ApproveArguments = {
    address: '5Chai5UGBHXFrXXcHtDypVWdvHnjrny2rDtfa9RHbM3JGpCw',
    // Account address for whom token will be approved
    spender: approvedSpender,
    collectionId,
    tokenId,
    isApprove: true
};

const result = await sdk.token.approve.submitWaitResult(approveArgs);
const { isCompleted } = result;
// console.log('result', result)

if (isCompleted) {
  console.log(`${approvedSpender} is the a new approved spender of token ${result.parsed?.tokenId} from collection ${result.parsed?.collectionId}`)
} else {
  console.log(`Unable to set new approved spender`)
  process.exit()
}

  process.exit()
}

main().catch((error) => {
  console.error(error)
})
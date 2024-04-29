import dotenv from "dotenv";
dotenv.config();
import fs from 'fs';
import path from 'path';
import Sdk, { TokenId } from '@unique-nft/sdk'
import {KeyringProvider} from '@unique-nft/accounts/keyring'
import { TransferArguments } from '@unique-nft/substrate-client/tokens';
////////////////////////////////////
///
/// Upload Multiple Files
///
/// https://docs.unique.network/reference/sdk-methods.html#upload-multiple-files
///
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

  const filename = 'cover.png';

  const PATH_FILE = path.join(__dirname, '..', 'artifacts', filename);

  const content = fs.readFileSync(PATH_FILE);
  
  const files = [
      { content: content, name: filename },
  ];
  
  const { fullUrl, cid } = await sdk.ipfs.uploadFiles({ files })

  // full url for entry on IPFS gateway
  // check the link below to see if file postfix is required (e.g. https://{ipfs_url}/{cid}/image.png)
  console.log(`url -> ${fullUrl}`);
  /** Entry CID_V0 */
  console.log(`cid: ${cid}`);

  process.exit()
}

main().catch((error) => {
  console.error(error)
})
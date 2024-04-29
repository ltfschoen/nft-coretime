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

  // const PATH_FILE_1 = path.join(__dirname, '..', 'artifacts', 'demo-cover.png');
  const PATH_FILE_2 = path.join(__dirname, '..', 'artifacts', 'demo-noise2.mp4');
  // const PATH_FILE_3 = path.join(__dirname, '..', 'artifacts', 'demo.png');

  // const content1 = fs.readFileSync(PATH_FILE_1);
  // const content2 = fs.createReadStream(PATH_FILE_2); // `createReadStream` does not work?
  const content2 = fs.readFileSync(PATH_FILE_2);
  // const content3 = fs.readFileSync(PATH_FILE_3);
  
  const files = [
      // { content: content1, name: `cover.png` },
      { content: content2, name: `nft.mp4` },
      // { content: content3, name: `image.png` },
  ];
  
  const { fullUrl, cid } = await sdk.ipfs.uploadFiles({ files })

  /** Full url for entry on IPFS gateway */
  console.log(`Open by browser -> ${fullUrl}`);
  /** Entry CID_V0 */
  console.log(`Or use CID if you need -> ${cid}`);

  /*
    Cover
      Open by browser -> https://ipfs.unique.network/ipfs/QmUisSsrD9S4qhEfrmvxfxPATVH49LU8ov5Y4MBoawaZR6
      Or use CID if you need -> QmUisSsrD9S4qhEfrmvxfxPATVH49LU8ov5Y4MBoawaZR6

    Image
      Open by browser -> https://ipfs.unique.network/ipfs/QmUXVMZ9b2uaqyT4T3ExksnyebHysXUjeSPwtVjK9PHSSk
      Or use CID if you need -> QmUXVMZ9b2uaqyT4T3ExksnyebHysXUjeSPwtVjK9PHSSk
  */

  process.exit()
}

main().catch((error) => {
  console.error(error)
})
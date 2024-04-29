# Deploy and interact with NFT or similar on Unique Network

Generate .env file and populate its value with the mnemonic seed of a Substrate-based account
```bash
cp .env.example .env
```

Reference: https://docs.unique.network/build/sdk/tokens.html

* Request Opan Testnet tokens from the faucet https://t.me/unique2faucet_opal_bot
* View balance by entering address in block explorer https://uniquescan.io/opal/

Run the following commands in this directory:
```bash
yarn run build
yarn run mint
yarn run setCollectionPermissions
yarn run setTokenPropertyPermissions
yarn run setTokenProperties
yarn run getTokenProperties
yarn run addTokensToCollection
yarn run getToken
yarn run setCollectionTransfersEnabledLimit
yarn run setCollectionLimits
yarn run transferToken
yarn run transferCollection
yarn run burnToken
yarn run uniqueUploadIpfs
```
* Note: Mint collection fee ~2 OPL, and mint token costs ~0.1 OPL
* View the tokens minted by going to https://uniquescan.io/opal

* TODO
  * in "Advanced Data"
  * how to change sponsored mint size to number other than 2048? 
  * how to change "Token limit" to number other than 4294967295?
  * how to change "Account token ownership limit" to number other than 100000000?
  https://uniquescan.io/opal/collections/2677

## Unique Resources & Support

* Unique developer support https://t.me/unique_network_support
* View block explorer https://uniquescan.io/opal/
* Guides - https://docs.unique.network/build/sdk/collections.html
* SDK Reference Docs - https://docs.unique.network/reference
* Blog on RFTs - https://unique.network/blog/re-fungible-nfts/
* Mint next tokens in the collection - https://youtu.be/KFZ8l-r9RY0?feature=shared&t=1528

# Upload to Pinata pinned CID

Generate .env file and populate its value with the Pinata API key and secret from https://pinata.cloud/
```bash
cp .env.example .env
```

* Copy file to upload to Pinata (e.g. .mp4 file type) into ./packages/nft/artifacts folder
* Change metadata name postfix in ./packages/nft/src/pinata/pinataUploadIpfs.ts to make it a unique upload (e.g. `-image-cover`, `-image-preview`, `-image`, `-nft`)
  ```
  pinataMetadata: {
    name: 'nft-coretime-image-cover',
  ```

* Run:
```
yarn run pinata-upload
```
* View file that has been uploaded in Pinata https://app.pinata.cloud/pinmanager

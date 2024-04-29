# Deploy and interact with NFT or similar on Unique Network

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
yarn run getToken
yarn run setCollectionTransfersEnabledLimit
yarn run setCollectionLimits
yarn run transferToken
yarn run transferCollection
yarn run burnToken
```
* Note: Mint collection fee ~2 OPL, and mint token costs ~0.1 OPL
* View the tokens minted by going to https://uniquescan.io/opal

* TODO
  * in "Advanced Data"
  * how to change sponsored mint size to number other than 2048? 
  * how to change "Token limit" to number other than 4294967295?
  * how to change "Account token ownership limit" to number other than 100000000?
  https://uniquescan.io/opal/collections/2677

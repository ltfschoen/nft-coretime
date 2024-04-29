# Next.js TypeScript frontend + Adonis.js backend + Lerna workspaces
# Unique Network NFTs

## Setup

> Note: This is based on https://github.com/andrevesdickow/nextjs-lerna

Install [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)

Install Node.js and Lerna
```bash
nvm use
npm install --global lerna
```

Start backend and frontend
```bash
yarn start:backend & yarn start:frontend
```
Reference: https://yarnpkg.com/getting-started/qa#how-to-share-scripts-between-workspaces

### Modifications

Create new workspace package in frontend
```bash
cd packages && yarn create next-app mypackage
```

Add a package to frontend
```bash
yarn add dotenv
```

## Unique Network NFTs

### Setup

Generate .env file and populate its value with the mnemonic seed of a Substrate-based account
```bash
cp .env.example .env
```

### Deploy and interact with NFTs

```bash
cd packages/nft
```

Run the commands mentioned in the [NFT README](./packages/nft/README.md]



### Unique Resources & Support

Unique developer support https://t.me/unique_network_support

View block explorer https://uniquescan.io/opal/

* Guides - https://docs.unique.network/build/sdk/collections.html

* SDK Reference Docs - https://docs.unique.network/reference

* Blog on RFTs - https://unique.network/blog/re-fungible-nfts/

## Pinata

TODO

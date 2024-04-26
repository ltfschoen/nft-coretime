# Next.js TypeScript frontend + Adonis.js backend + Lerna workspaces

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
```
cd packages && yarn create next-app mypackage
```

Add a package to frontend
```
yarn add dotenv
```

## Unique Network NFTs

### Setup

Generate .env file and populate its value with the mnemonic seed of a Substrate-based account
```bash
cp .env.example .env
```

### Mint NFT on Opal Testnet

```bash
cd packages/nft
yarn run build
node ./dist
```

View block explorer https://uniquescan.io/opal/

Unique developer support https://t.me/unique_network_support
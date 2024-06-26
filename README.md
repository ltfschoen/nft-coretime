# Multiple packages

## Next.js TypeScript frontend + Adonis.js backend + Lerna workspaces

### Setup

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

### Optional Modifications

Create new workspace package in frontend
```bash
cd packages && yarn create next-app mypackage
```

Add a package to frontend
```bash
yarn add dotenv
```

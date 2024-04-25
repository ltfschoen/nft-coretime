
# Setup

> Note: This is based on https://github.com/andrevesdickow/nextjs-lerna

Install [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)
Setup
```bash
nvm use v20.12.0
npm install --global lerna
```

Start backend and frontend
```bash
yarn start:frontend
yarn start:backend
```

# Modifications

Create new workspace package in frontend
```
cd packages && yarn create next-app mypackage
```

Add a package to frontend
```
yarn add dotenv
```

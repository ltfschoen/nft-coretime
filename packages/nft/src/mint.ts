import dotenv from "dotenv";
dotenv.config();
import assert from 'assert';
import { BigNumber } from 'bignumber.js';
import Sdk, { CHAIN_CONFIG, TokenId } from '@unique-nft/sdk'
import {KeyringProvider} from '@unique-nft/accounts/keyring'
import {
  SetCollectionPermissionsArguments,
  CollectionAccess,
} from '@unique-nft/substrate-client/tokens';
// https://docs.unique.network/build/sdk/collections.html#create-a-collection-using-schemas
import {
  AttributeType,
  COLLECTION_SCHEMA_NAME,
  UniqueCollectionSchemaToCreate,
} from '@unique-nft/schemas'

////////////////////////////////////
///
/// Mint a Token in a Collection
///
/// Instructions:
///   - Change `baseUrl` to the endpoint of the chain you want to connect to
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
    baseUrl: CHAIN_CONFIG.opal.restUrl,
    signer: account,
  })
  // console.log('sdk', sdk)

  const IMAGE = 'QmYcU4p1zjW2NbT3sQhRhDC5gaEj5weFP7tiUqvMM1pEKE';
  const infix = IMAGE;
  const IMAGE_COVER = 'QmZLgjDosGZEwBZeiDMaBodP7Mh9oqTyc3ifhktSuSXZZt';
  const NFT = 'QmNtWtia2njH5N8bUQMWjc39hkhwMKBHQWNEd4GhRe7BwG';


  // FIXME: type UniqueCollectionSchemaToCreate or UniqueCollectionSchemaToCreateDto ?
  const collectionSchema = {
    schemaName: COLLECTION_SCHEMA_NAME.unique,
    schemaVersion: '1.0.0',
    image: {
      // e.g. https://ipfs.unique.network/ipfs/{infix}
      urlTemplate: `https://gateway.pinata.cloud/ipfs/{infix}`
    },
    imagePreview: {
      urlTemplate: `https://gateway.pinata.cloud/ipfs/{infix}`
    },
    coverPicture: {
      ipfsCid: IMAGE_COVER,
    },
    // AudioDto
    audio: {
      urlTemplate: 'https://gateway.pinata.cloud/ipfs/{infix}',
      format: 'mp3',
      isLossless: false,
    },
    // SpatialObjectDto
    spatialObject: {
      urlTemplate: 'https://gateway.pinata.cloud/ipfs/{infix}',
      format: 'mp4'
    },
    // VideoDto
    video: {
      urlTemplate: 'https://gateway.pinata.cloud/ipfs/{infix}',
    },
    // VideoDto
    file: {
      urlTemplate: 'https://gateway.pinata.cloud/ipfs/{infix}',
    },
    // UniqueRoyaltyPartToEncodeDto
    royaltyType: [
      {
        version: 1,
        royaltyType: 'DEFAULT', // 'DEFAULT' | 'PRIMARY_ONLY'
        decimals: 18,
        /** bigint as string */
        value: new BigNumber(0.1),
        /**
         * The ss-58 encoded address
         * @example 5G7Jb5JeGV9SN9TUXLqWpxgmEt3o7bQtTNt1FMYgERTdULMf
         */
        address: '5G7Jb5JeGV9SN9TUXLqWpxgmEt3o7bQtTNt1FMYgERTdULMf'
      }
    ],
    attributesSchemaVersion: '1.0.0',
    attributesSchema: {
      0: {
        name: {_: 'coretime-chain'},
        type: AttributeType.string,
        optional: false,
        isArray: false,
        enumValues: {
          0: {_: 'kusama-coretime'},
          1: {_: 'polkadot-coretime'},
        }
      }
    },
  }

  ////////////////////////////////////
  // Create collection
  ////////////////////////////////////

  // Note: NFT by default. Althernatively Fungible https://docs.unique.network/reference/sdk-methods.html#fungible
  const {parsed, error} = await sdk.collection.create.submitWaitResult({
    address,
    name: 'Coretime NFT collection',
    description: 'Coretime NFT collection',
    tokenPrefix: 'CTC',
    schema: collectionSchema,
    // Collection permissions
    // Optional: Token owners and collection admins are allowed to nest tokens:
    // https://docs.unique.network/reference/sdk-methods.html#arguments-8
    permissions: {
      access: CollectionAccess.Normal, // e.g. "Normal"
      mintMode: true,
      nesting: {
        tokenOwner: true,
        collectionAdmin: true,
        // You can set collection ids allowed for nesting:
        // restricted: [1] 
      },
    },
    properties: [
      {
        key: 'kusama-coretime-blocknumber-first-sale',
        value: '94879',
      },
    ],
    // Token Property permissions
    tokenPropertyPermissions: [
      {
        key: 'kusama-coretime-blocknumber-first-sale',
        permission: {
          mutable: true,
          tokenOwner: true,
          collectionAdmin: true,
        }
      }
    ],
    limits: {
      accountTokenOwnershipLimit: 48, // max tokens one address can own
      // max is 2048
      sponsoredDataSize: 2048, // max byte size of custom token data sponsorable when tokens are minted in sponsored mode
      sponsoredDataRateLimit: 30, // qty blocks between setVariableMetadata txs in order for them to be sponsored
      tokenLimit: 48, // total amount of tokens that can be minted in this collection
      sponsorTransferTimeout: 600, // time interval in blocks of a non-privileged user transfer or the mint transaction can be sponsored
      sponsorApproveTimeout: 600, // time interval in blocks of a non-privileged user approve transaction can be sponsored
      ownerCanTransfer: true, // boolean if collection owner or admins can transfer or burn tokens owned by other non-privileged users
      ownerCanDestroy: true,
      transfersEnabled: true, // whether token transfers between users are currently enabled
    }
  })
  console.log('parsed', parsed)

  if (error) throw Error("Error occurred while creating a collection");
  if (!parsed) throw Error("Cannot parse results");

  const collectionId = parsed?.collectionId as number
  console.log(`Collection created. Id: ${collectionId}`)
  console.log(`View this minted collection at https://uniquescan.io/opal/collections/${collectionId}`)

  const tokens = [ // array of tokens
    { // 1st token
      data: {
        image: {
          // e.g. https://ipfs.io/ipfs/QmYJDpmWyjDa3H6BxweFmQXk4fU8b1GU7M9EqYcaUNvXzc
          ipfsCid: 'QmNtWtia2njH5N8bUQMWjc39hkhwMKBHQWNEd4GhRe7BwG', // NFT
        },
        name: {
          _: 'Kusama Coretime NFT 1',
        },
        description: {
          _: 'Kusama Coretime NFT to commemorate initial sales',
        },
      },
    },
    { // 2nd token
      data: {
        image: {
          // e.g. https://ipfs.io/ipfs/QmYJDpmWyjDa3H6BxweFmQXk4fU8b1GU7M9EqYcaUNvXzc
          ipfsCid: 'https://ipfs.io/ipfs/QmYJDpmWyjDa3H6BxweFmQXk4fU8b1GU7M9EqYcaUNvXzc',
        },
        name: {
          _: 'Kusama Coretime NFT 2',
        },
        description: {
          _: 'Kusama Coretime NFT to commemorate initial sales',
        },
      },
    },
    { // 3rd token
      data: {
        image: {
          // e.g. https://ipfs.io/ipfs/QmcqTqFM47LtQbFe5AtaCkg4DC5HcGGhVK6r8Tyqc3CV4h
          ipfsCid: 'https://ipfs.io/ipfs/QmcqTqFM47LtQbFe5AtaCkg4DC5HcGGhVK6r8Tyqc3CV4h',
        },
        name: {
          _: 'Kusama Coretime NFT 3',
        },
        description: {
          _: 'Kusama Coretime NFT to commemorate initial sales',
        },
      },
    },
    { // next
      data: {
        // FIXME - why does this cause error?
        // encodedAttributes: {
        //   '0': 0,
        //   '1': [0],
        //   '2': 'foo_bar', 
        // },
        image: {
          // e.g. https://ipfs.io/ipfs/QmYJDpmWyjDa3H6BxweFmQXk4fU8b1GU7M9EqYcaUNvXzc
          ipfsCid: 'QmUisSsrD9S4qhEfrmvxfxPATVH49LU8ov5Y4MBoawaZR6', // valid IPFS CID
        },
        name: {
          _: 'cover',
        },
        description: {
          _: 'cover',
        },
      },
    },
    { // next
      data: {
        image: {
          // e.g. https://ipfs.io/ipfs/QmYJDpmWyjDa3H6BxweFmQXk4fU8b1GU7M9EqYcaUNvXzc
          ipfsCid: 'QmUXVMZ9b2uaqyT4T3ExksnyebHysXUjeSPwtVjK9PHSSk', // valid IPFS CID
        },
        name: {
          _: 'image',
        },
        description: {
          _: 'image',
        },
      },
    },
  ];

  // https://docs.unique.network/about/limitations/limitations.html
  assert(tokens.length < 35, "The safe limit is 35 NFTs minted at once.");

  ////////////////////////////////////
  // Mint token(s)
  ////////////////////////////////////
  const result = await sdk.token.createMultiple.submitWaitResult({
    address,
    collectionId,
    tokens: tokens,
  })
  console.log('result', result)

  // Note: To get a hex-encoded payload, you can use .build. For example:
  //   const unsignedTxPayload = await sdk.token.create.build({
  //     collectionId: 2677,
  //   });

  const mintedTokensCount = result?.parsed?.length
  let currentTokenId;
  result.parsed?.forEach((token, index) => {
    currentTokenId = token?.tokenId as number
    console.log(`Minted token ID #${currentTokenId}/${mintedTokensCount} in collection ${collectionId}`)
    console.log(`View this minted token at https://uniquescan.io/opal/tokens/${collectionId}/${currentTokenId}`)
  });

  process.exit()
}

main().catch((error) => {
  console.error(error)
})

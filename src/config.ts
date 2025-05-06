// Deployed contract addresses
export const REFERRAL_CONTRACT_ADDRESS = '0x6EDbcb1df05E09cceB74cb4239b3856B33a292aF'; // Fixed checksum
export const USDT_CONTRACT_ADDRESS = '0x4aE58BfC16b20bD67755FFD5560e85779D962415'; // Updated address

// Original $1 pool contract - keeping for backward compatibility
export const RAFFLE_CONTRACT_ADDRESS = '0x1BF59e98C2ae24805C6CfB604Aa8C144E587ac6a'; // Fixed checksum

// All pool contracts with different price tiers
export const POOL_CONTRACTS = {
  POOL_1_DOLLAR: {
    address: '0x1BF59e98C2ae24805C6CfB604Aa8C144E587ac6a', // Fixed checksum (Same as RAFFLE_CONTRACT_ADDRESS)
    name: '$1 Pool',
    entryFeeUSD: 1
  },
  POOL_2_DOLLAR: {
    address: '0xBb21092B01257Ac601909739fE82206C0c3884EC', // Updated address
    name: '$10 Pool',
    entryFeeUSD: 10
  },
  POOL_5_DOLLAR: {
    address: '0x4A93D831F24C192F850eacc48084f5c10918fAC3', // Updated address
    name: '$100 Pool',
    entryFeeUSD: 100
  },
  POOL_10_DOLLAR: {
    address: '0x075AC4F96b552466Fde25219F289A3dA28B562a8', // Updated address
    name: '$1000 Pool',
    entryFeeUSD: 1000
  },
  POOL_20_DOLLAR: {
    address: '0x31FCAB5ab1eDad7cFCB7f87803e817935465F4DE', // Updated address
    name: '$10000 Pool',
    entryFeeUSD: 10000
  },
  POOL_50_DOLLAR: {
    address: '0x0EBad2a80B180E254DCEFd492894542775F65F1b', // Updated address
    name: '$100000 Pool',
    entryFeeUSD: 100000
  }
};

// Chain ID for the network where the contract is deployed (e.g., 97 for BSC Testnet)
export const CHAIN_ID = 97; // BSC Testnet

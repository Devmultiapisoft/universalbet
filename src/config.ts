// Deployed contract addresses
export const REFERRAL_CONTRACT_ADDRESS = '0xCB82A27500480629Eb39B3db26db8239f09b5457'; // Fixed checksum
export const USDT_CONTRACT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955'; // Updated address

// Original $1 pool contract - keeping for backward compatibility
export const RAFFLE_CONTRACT_ADDRESS = '0x86e85f183E488EeCFA340AB0BDA631B8E1c03977'; // Fixed checksum

// All pool contracts with different price tiers
export const POOL_CONTRACTS = {
  POOL_1_DOLLAR: {
    address: '0x86e85f183E488EeCFA340AB0BDA631B8E1c03977', // Fixed checksum (Same as RAFFLE_CONTRACT_ADDRESS)
    name: '$1 Pool',
    entryFeeUSD: 1
  },
  POOL_2_DOLLAR: {
    address: '0xDCD01b6Fb4dF794FF26c9F3bB3B957632C85D48B', // Updated address
    name: '$10 Pool',
    entryFeeUSD: 10
  },
  POOL_5_DOLLAR: {
    address: '0xcEE67C136a6EbEAE24E6bAA9A94DFF22A410DAB9', // Updated address
    name: '$100 Pool',
    entryFeeUSD: 100
  },
  POOL_10_DOLLAR: {
    address: '0x9eF2a2497018064077EaB6C3D81EC73EA02f5e11', // Updated address
    name: '$1000 Pool',
    entryFeeUSD: 1000
  },
  POOL_20_DOLLAR: {
    address: '0x5aDdC5EaC842Fd0dAE46509037A1B538b814c90c', // Updated address
    name: '$10000 Pool',
    entryFeeUSD: 10000
  },
  POOL_50_DOLLAR: {
    address: '0x16d5763268A77c2b7b516629f65eB00A41da2146', // Updated address
    name: '$100000 Pool',
    entryFeeUSD: 100000
  }
};

// Chain ID for the network where the contract is deployed (e.g., 97 for BSC Testnet)
export const CHAIN_ID = 97; // BSC Testnet

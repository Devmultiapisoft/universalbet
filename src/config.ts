// Deployed contract addresses
export const REFERRAL_CONTRACT_ADDRESS = '0x6EDbcb1df05E09cceB74cb4239b3856B33a292aF'; // Fixed checksum
export const USDT_CONTRACT_ADDRESS = '0x4aE58BfC16b20bD67755FFD5560e85779D962415'; // Updated address

// Original $1 pool contract - keeping for backward compatibility
export const RAFFLE_CONTRACT_ADDRESS = '0x88046520320b3c9A9521F93b806B89A3D3033f3c'; // Fixed checksum

// All pool contracts with different price tiers
export const POOL_CONTRACTS = {
  POOL_1_DOLLAR: {
    address: '0x88046520320b3c9A9521F93b806B89A3D3033f3c', // Fixed checksum (Same as RAFFLE_CONTRACT_ADDRESS)
    name: '$1 Pool',
    entryFeeUSD: 1
  },
  POOL_2_DOLLAR: {
    address: '0xC8BA5B6F7D64a932c0B21959aEE6363312069779', // Updated address
    name: '$10 Pool',
    entryFeeUSD: 10
  },
  POOL_5_DOLLAR: {
    address: '0x68a149856E825eba8dea6E170dC06d73ceb60981', // Updated address
    name: '$100 Pool',
    entryFeeUSD: 100
  },
  POOL_10_DOLLAR: {
    address: '0x72daB1882ac380e32879Aec55c703957a0179908', // Updated address
    name: '$1000 Pool',
    entryFeeUSD: 1000
  },
  POOL_20_DOLLAR: {
    address: '0x0f6cca406FAb3Efa73920539AfEc9B4E5cD3eea2', // Updated address
    name: '$10000 Pool',
    entryFeeUSD: 10000
  },
  POOL_50_DOLLAR: {
    address: '0x2e70E79e77cc894DC9c76732D06dE04eE7d416e6', // Updated address
    name: '$100000 Pool',
    entryFeeUSD: 100000
  }
};

// Chain ID for the network where the contract is deployed (e.g., 97 for BSC Testnet)
export const CHAIN_ID = 97; // BSC Testnet

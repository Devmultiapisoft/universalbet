import { CHAIN_ID } from '../config';

// BSC Testnet network parameters
const BSC_TESTNET = {
  chainId: '0x61', // 97 in hex
  chainName: 'Binance Smart Chain Testnet',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'tBNB',
    decimals: 18
  },
  rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
  blockExplorerUrls: ['https://testnet.bscscan.com/']
};

/**
 * Checks if the user is on the correct network
 * @returns Promise<boolean> True if on correct network
 */
export const checkNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) return false;
  
  try {
    const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
    return parseInt(currentChainId, 16) === CHAIN_ID;
  } catch (error) {
    console.error('Error checking network:', error);
    return false;
  }
};

/**
 * Switches the network to the correct one
 * @returns Promise<boolean> True if switch was successful
 */
export const switchNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) return false;
  
  try {
    // Try to switch to the network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
    });
    return true;
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [BSC_TESTNET],
        });
        return true;
      } catch (addError) {
        console.error('Error adding network:', addError);
        return false;
      }
    }
    console.error('Error switching network:', switchError);
    return false;
  }
};

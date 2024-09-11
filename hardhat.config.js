require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables from .env

// Access environment variables for network configurations
const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: API_URL, 
      accounts: [`0x${PRIVATE_KEY}`], 
    },
    mainnet: {
      url: API_URL, 
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPrice: 20,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || "", 
    outputFile: 'gas-report.txt',
    noColors: true,
  },
  mocha: {
    timeout: 20000, 
  },
};

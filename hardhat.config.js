require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle')

const MNEMONIC = "test test test test test test test test test test test junk"

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      // https://hardhat.org/metamask-issue.html
      chainId: 1337
    },
    kovan: {
      url: `https://eth-kovan.alchemyapi.io/v2/NIeS3wbshIbVS4bnroczjgJRAMvZyfpW`,
      accounts: {
        mnemonic: MNEMONIC
      }
    }
  }
};

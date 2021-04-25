require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle')

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
  }
};

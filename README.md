# Ethereum Box
This is a simple but test-complete implementation of a trustless, decentralised way to store a single number.

It's a simple example of building on the Ethereum blockchain.

The Box smart contract comes from excellent [OpenZeppelin's Deveoping Smart Contracts guide](https://docs.openzeppelin.com/learn/developing-smart-contracts).

## Get started

### Prerequisites

* You'll need a recent version of `node` installed (try installing it through the [asdf version manager](https://asdf-vm.com) if you haven't installed it yet).

### Get building

1. Clone and setup this project.
  ```sh
  git clone https://github.com/xtyrrell/hardhat-console-error.git
  cd hardhat-console-error
  npm i
  ```

2. (In a seperate terminal) Start a Hardhat Network node to run a development-friendly version of the Ethereum blockhain locally.
  ```sh
  npx hardhat node
  ```

3. Run the tests
  ```sh
  npx hardhat test
  ```

4. Hack on `Box.sol` or create more contracts!

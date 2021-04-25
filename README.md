# Ethereum Box
This is a simple but test-complete example of an end-to-end Etherum dApp implementation.

In `smart-contracts`, it has a smart contract written in Solidity 0.7.3, which simply holds two values: `publicValue`, which anyone can read and anyone can write, and `restrictedValue`, which anyone can write but only the contract owner can write.

In `website`, it has a React frontend integrated with MetaMask that allows users to read and write to the two values.

It's a simple but comprehensive example of everything you'll need to build on the Ethereum blockchain.

The `Box` smart contract comes from excellent [OpenZeppelin's Deveoping Smart Contracts guide](https://docs.openzeppelin.com/learn/developing-smart-contracts).

## Get building

### Prerequisites

* You'll need a recent version of `node` installed (if you haven't got it installed, try installing it through the excellent [asdf version manager](https://asdf-vm.com)).

### Setup instructions

First, clone and enter this project.
  ```sh
  git clone https://github.com/xtyrrell/ethereum-box.git
  cd ethereum-box
  ```

Then, you'll want to setup the `smart-contracts` project and then the `website` project.

#### `smart-contracts`

1. Move into the `smart-contracts` directory and install its dependencies.
  ```sh
  cd smart-contracts
  npm i
  ```

2. (In a different terminal) Start a Hardhat Network node to run a development-friendly version of the Ethereum blockhain locally.
  ```sh
  npx hardhat node
  ```

3. Run the tests to get an idea of the smart contract's expected functionality and see that everything works.
  ```sh
  npx hardhat test
  ```

4. Hack on `Box.sol` or create more contracts!

5. Deploy the contract.
  ```
  npx hardhat run --network localhost scripts/deploy.js
  ```

#### `website`

1. Move into the `website` directory and install its dependencies.
  ```sh
  cd ../website
  npm i
  ```

2. Run the tests, start the server.

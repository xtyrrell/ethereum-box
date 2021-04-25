# Ethereum Box
This is a simple but test-complete example of an end-to-end Etherum dApp implementation.

There is a smart contract `contracts/Box.sol` written in Solidity 0.7.3, which simply holds two values: `publicValue`, which anyone can read and anyone can write, and `restrictedValue`, which anyone can write but only the contract owner can write.

There is a test suite against this smart contract in `test/Box.js`.

Finally, there is a HTML, SASS and vanilla JS frontend with MetaMask integration that allows users to read and write to the two values.

It's a simple but comprehensive example of everything you'll need to build a small dApp on the Ethereum blockchain.

The `Box` smart contract comes from excellent [OpenZeppelin's Developing Smart Contracts guide](https://docs.openzeppelin.com/learn/developing-smart-contracts).

## Get building

### Prerequisites

* You'll need a recent version of `node` installed (if you haven't got it installed, try installing it through the excellent [asdf version manager](https://asdf-vm.com)).

### Setup instructions

1. Clone and enter the project and install dependencies.
  ```sh
  git clone https://github.com/xtyrrell/ethereum-box.git
  cd ethereum-box
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

5. Deploy the contract and set the deployed address in the frontend.
  ```
  npx hardhat run --network localhost scripts/deploy.js
  # Box deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
  ```
  Set `CONTRACT_ADDRESS` at the top of `src/script.js` to the address just printed.

6. Start the frontend.
  ```sh
  npm start
  ```

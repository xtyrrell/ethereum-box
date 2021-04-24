# Hardhat Console Error
This repository exists to demonstrate an issue I had using the Hardhat console.

It uses the extremely-simple Box sample contract from [https://docs.openzeppelin.com/learn/developing-smart-contracts](https://docs.openzeppelin.com/learn/developing-smart-contracts).

## Steps to reproduce

1. Clone and setup this project.
  ```sh
  git clone https://github.com/xtyrrell/hardhat-console-error.git
  cd hardhat-console-error
  npm i
  npx hardhat node
  ```

2. (In a seperate terminal) Compile the sample Box contract.
  ```sh
  npx hardhat compile
  ```

3. Deploy the contract. You will see that box the Contract functions `store` and `retrieve` run fine and produce no errors.
  ```sh
  npx hardhat run --network localhost scripts/deploy.js
  ```

4. Enter the Hardhat console and run the same two functions. You will see that `retrieve` produces an error.
  ```sh
  npx hardhat console
  ```
  and in the console:
  ```js
  const Box = await ethers.getContractFactory("Box")
  // const box = await Box.attach("<the address the contract was deployed at in step 3>")
  const box = await Box.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
  
  await box.store(1)
  await box.retrieve() // produces the following error
  
  // Uncaught:
    // Error: call revert exception (method="retrieve()", errorSignature=null, errorArgs=[null], reason=null, code=CALL_EXCEPTION, version=abi/5.1.1)
    // at step (/home/max/workspace/shai-coin/node_modules/@ethersproject/contracts/lib/index.js:48:23)
    // at Contract.<anonymous> (/home/max/workspace/shai-coin/node_modules/@ethersproject/contracts/src.ts/index.ts:321:44)
    // at Interface.decodeFunctionResult (/home/max/workspace/shai-coin/node_modules/@ethersproject/abi/src.ts/interface.ts:326:23)
    // at Logger.throwError (/home/max/workspace/shai-coin/node_modules/@ethersproject/logger/src.ts/index.ts:217:20)
    // at Logger.makeError (/home/max/workspace/shai-coin/node_modules/@ethersproject/logger/src.ts/index.ts:205:28) {
  // reason: null,
  // code: 'CALL_EXCEPTION',
  // method: 'retrieve()',
  // errorSignature: null,
  // errorArgs: [ null ],
  // address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  // args: [],
  // transaction: {
  //   data: '0x2e64cec1',
  //   to: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  //   from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  //   gasLimit: BigNumber { _hex: '0xaf09a8', _isBigNumber: true }
  // }
  // }
  ```
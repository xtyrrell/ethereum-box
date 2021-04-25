// This is an example of interacting with the Box contract through ethers
async function main() {
  // You'll need to change this to the deployed contract address, which is output
  // when running scripts/deploy.js
  const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

  const Box = await ethers.getContractFactory("Box")

  const box = await Box.attach(CONTRACT_ADDRESS)

  await box.storePublic(10)
  await box.storeRestricted(99)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

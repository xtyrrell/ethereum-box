async function main() {
  const Box = await ethers.getContractFactory("Box")
  console.log("Deploying Box...")

  const box = await Box.deploy()
  await box.deployed()

  console.log(`Box deployed to ${box.address}`)

  const storedResult = await box.store(42)
  console.log(`box.store(42) succeeded!`)

  const retrievedResult = await box.retrieve()
  console.log(`box.retrieve() succeeded!`)

  console.log(`retrievedResult: ${JSON.stringify(retrievedResult)}`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

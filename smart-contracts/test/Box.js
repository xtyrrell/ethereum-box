const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Box contract", () => {
  let Box
  let box
  let owner, otherAddress1, otherAddress2

  beforeEach(async () => {
    Box = await ethers.getContractFactory("Box")
    box = await Box.deploy()

    ;[owner, otherAddress1, otherAddress2] = await ethers.getSigners()
  })

  describe("Deployment", () => {
    it("should set the right owner", async () => {
      expect(await box.owner()).to.equal(owner.address)
    })
  })

  describe("Usage", () => {
    it("should allow the owner to store a value", async () => {
      await box.connect(owner).store(11)
  
      const retrievedValue = (await box.connect(owner).retrieve()).toString()
      return expect(retrievedValue).to.equal("11")
    })

    it("should allow non-owners to read a value", async () => {
      await box.connect(owner).store(22)
  
      const retrievedValue = (await box.connect(otherAddress1).retrieve()).toString()
      return expect(retrievedValue).to.equal("22")
    })
  
    it("should prevent non-owners from storing a value", async () => {
      return expect(box.connect(otherAddress1).store(500)).to.be.revertedWith("Ownable: caller is not the owner")
    })
  })

  describe("Events", () => {
    it("should emit the ValueChanged event when the value is changed", async () => {
      return expect(box.store(123)).to.emit(box, 'ValueChanged').withArgs(123)
    })
  })
})

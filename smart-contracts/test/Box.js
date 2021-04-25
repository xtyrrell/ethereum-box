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
      return expect(await box.owner()).to.equal(owner.address)
    })
  })

  describe("Using the public (anyone can write, anyone can read) variable", () => {
    it("should allow the owner to store a value", async () => {
      await box.storePublic(11)

      const retrievedValue = (await box.retrievePublic()).toString()
      return expect(retrievedValue).to.equal("11")
    })

    it("should allow non-owners to store a value", async () => {
      await box.connect(otherAddress1).storePublic(1250)

      const retrievedValue = (await box.retrievePublic()).toString()
      return expect(retrievedValue).to.equal("1250")
    })

    it("should allow non-owners to read a value", async () => {
      await box.storePublic(22)

      const retrievedValue = (await box.connect(otherAddress1).retrievePublic()).toString()
      return expect(retrievedValue).to.equal("22")
    })
  })

  describe("Using the restricted (owner can write, anyone can read) variable", () => {
    it("should allow the owner to store a value", async () => {
      await box.storeRestricted(12345)
  
      const retrievedValue = (await box.retrieveRestricted()).toString()
      return expect(retrievedValue).to.equal("12345")
    })

    it("should allow non-owners to read a value", async () => {
      await box.storeRestricted(999)
  
      const retrievedValue = (await box.connect(otherAddress1).retrieveRestricted()).toString()
      return expect(retrievedValue).to.equal("999")
    })

    it("should prevent non-owners from storing a value", async () => {
      return expect(box.connect(otherAddress1).storeRestricted(500)).to.be.revertedWith("Ownable: caller is not the owner")
    })
  })

  describe("Events", () => {
    it("should emit the PublicValueChanged event when the public value is changed", async () => {
      return expect(box.storePublic(1230)).to.emit(box, 'PublicValueChanged').withArgs(1230)
    })

    it("should emit the RestrictedValueChanged event when the restricted value is changed", async () => {
      return expect(box.storeRestricted(8899)).to.emit(box, 'RestrictedValueChanged').withArgs(8899)
    })
  })
})

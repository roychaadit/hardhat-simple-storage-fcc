const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should add person when we call addPerson", async function () {
        const newValue = 21
        const newPerson = "Aadit"

        const transactionResponse = await simpleStorage.addPerson(
            newPerson,
            newValue,
        )
        await transactionResponse.wait(1)

        const expectedValue = await simpleStorage.nameToFavoriteNumber(
            newPerson,
        )
        assert.equal(expectedValue.toString(), newValue.toString())
    })
})

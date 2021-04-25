import { ethers } from "ethers";

// TODO: Pull this from artifacts. don't hardcode it
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const NETWORK = "http://127.0.0.1:8545";

// ---
// utilities
// ---

const debugDiv = document.getElementById("debug")
const log = (...args) => {
  debugDiv.innerText += args.map(x => `> ${typeof x === "string" ? x : JSON.stringify(x)}\n`).join("")
  console.log(...args)
}

log("using ethers:", ethers);
log("using window.ethereum:", window.ethereum)

// ---
// the main action
// ---

async function setContractInfoInDom() {
  document.querySelectorAll(".value.network").forEach(node => node.textContent = NETWORK)
  document.querySelectorAll(".value.contract-address").forEach(node => node.textContent = CONTRACT_ADDRESS)
}

async function readValuesIntoDom(readOnlyContract) {
  // first, clear the values if they already exist
  document.querySelectorAll(".readPublicValue").forEach(node => node.textContent = "")
  document.querySelectorAll(".readRestrictedValue").forEach(node => node.textContent = "")

  const retrievedPublicValue = (await readOnlyContract.retrievePublic()).toString()
  log("retrieved public retrievedPublicValue", retrievedPublicValue)

  const retrievedRestrictedValue = (await readOnlyContract.retrieveRestricted()).toString()
  log("retrieved public retrievedRestrictedValue", retrievedRestrictedValue)

  document.querySelectorAll(".readPublicValue").forEach(node => node.textContent = retrievedPublicValue)
  document.querySelectorAll(".readRestrictedValue").forEach(node => node.textContent = retrievedRestrictedValue)
}

async function setPublicValue(contract) {
  const newPublicValue = document.querySelector(".writePublicValue .value-input").value

  log("new public value in form", newPublicValue)
  log("write public value response", await contract.storePublic(newPublicValue))

  document.querySelector(".writePublicValue .value-input").value = ""
}

async function setRestrictedValue(contract) {
  const newRestrictedValue = document.querySelector(".writeRestrictedValue .value-input").value

  log("new restricted value in form", newRestrictedValue)

  try {
    log("write restricted value response", await contract.storeRestricted(newRestrictedValue))
  } catch (e) {
    const notAuthorised = e?.data?.message?.includes("Ownable: caller is not the owner")

    if (notAuthorised) {
      alert("Your attempt to change this value was rolled back because you didn't pass the access control check. Only the account that deployed this contract can change `restrictedValue`.")
    } else {
      alert("Oops! There was an issue running this transaction: " + e.data.message)
    }
  }

  document.querySelector(".writeRestrictedValue .value-input").value = ""
}

async function requestSignerAccounts() {
  // await window.ethereum.enable()
  await ethereum.send('eth_requestAccounts')

  // A Web3Provider wraps a standard Web3 provider, which is
  // what Metamask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  // The Metamask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner()

  return signer
}

// get a provider/signer
// connect to contract by giving it an ABI description, address and provider/signer
// then we can run the contract methods
async function main() {
  const directProvider = new ethers.providers.JsonRpcProvider(NETWORK)

  // TODO: Symlink an artifacts to `smart-contracts/artifacts` and use the generated ABI rather than this
  // hardcoded interface and contract address

  const contractInterface = [
    'function storePublic(uint256 newValue) public',
    'function storeRestricted(uint256 newValue) public',
    'function retrievePublic() public view returns (uint256)',
    'function retrieveRestricted() public view returns (uint256)'
  ]

  await setContractInfoInDom()

  const readOnlyContract = new ethers.Contract(CONTRACT_ADDRESS, contractInterface, directProvider)
  readValuesIntoDom(readOnlyContract)

  document.querySelectorAll('.reload-values').forEach(node => node.addEventListener('click', () => {
    readValuesIntoDom(readOnlyContract)
  }))

  
  // ---
  
  const signer = await requestSignerAccounts()
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractInterface, signer)

  document.querySelector("form.writePublicValue").addEventListener('submit', event => {
    event.preventDefault()
    setPublicValue(contract)
  })

  document.querySelector("form.writeRestrictedValue").addEventListener('submit', event => {
    event.preventDefault()
    setRestrictedValue(contract)
  })

  // try {
  //   await contract.storePublic(9999)
  //   log('Successfully ran `contract.storePublic(value)`')
  // } catch (e) {
  //   log('Error trying to run `contract.storePublic(value)`')
  // }


  // await contract.storeRestricted(1010101)
}


main()

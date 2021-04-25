import { ethers } from "ethers";
import Box from "./artifacts/contracts/Box.sol/Box.json"

const CONTRACT_ADDRESS = "0xbb32B12BE8eAa6d159308386563B6490bb4A5DB0";

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
  document.querySelectorAll(".value.network").forEach(node => node.textContent = "Web3Provider")
  document.querySelectorAll(".value.contract-address").forEach(node => node.textContent = CONTRACT_ADDRESS)
  document.querySelectorAll(".value.net-type").forEach(node => node.textContent = "Kovan")
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
  await window.ethereum.request({ method: 'eth_requestAccounts' });

  // A Web3Provider wraps a standard Web3 provider, which is
  // what Metamask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  // The Metamask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner()

  return signer
}

// The main flow is:
// 1. Connect to a wallet (MetaMask) which a user can use to sign transactions.
// 2. Load our contract. We need to provide the ABI description, contract address, and a signer which can sign transactions.
// 3. With those two, we now freely interact with our contract.
async function main() {
  // For demonstration of the difference between a provider and a signer, we first read the values from Box using just a
  // provider. This is easier to setup, because you don't need a user to connect with MetaMask or another wallet.
  // const directProvider = new ethers.providers.JsonRpcProvider(PROVIDER_URL)
  
  const signer = await requestSignerAccounts()
  const contract = new ethers.Contract(CONTRACT_ADDRESS, Box.abi, signer)
  // const readOnlyContract = new ethers.Contract(CONTRACT_ADDRESS, Box.abi, directProvider)

  await setContractInfoInDom()

  await readValuesIntoDom(contract)

  document.querySelectorAll('.reload-values').forEach(node => node.addEventListener('click', () => {
    readValuesIntoDom(contract)
  }))

  // ---

  document.querySelector("form.writePublicValue").addEventListener('submit', event => {
    event.preventDefault()
    setPublicValue(contract)
  })

  document.querySelector("form.writeRestrictedValue").addEventListener('submit', event => {
    event.preventDefault()
    setRestrictedValue(contract)
  })
}

main()

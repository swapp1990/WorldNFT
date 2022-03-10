const Web3 = require("web3");
const LuvNFT = require("./abi/LuvNFT.json");
const web3 = new Web3("https://api.s0.b.hmny.io");

require("dotenv").config();

let hmyMasterAccount = web3.eth.accounts.privateKeyToAccount(
  "cf83092b2b6dd847a02a0d039ce51b2c887e9f9d4252b8c09a13dd5c36871fb7"
);
web3.eth.accounts.wallet.add(hmyMasterAccount);
web3.eth.defaultAccount = hmyMasterAccount.address;

const myAddress = web3.eth.defaultAccount;
const { extractJSONFromURI } =require("./extractJSONFromURI");

//tmp data
const tokenInfo = {
  name: "New York",
  attributes: {
    latitude: 39,
    longitude: 120,
  },
};

const getContract = async () => {
  const contract = new web3.eth.Contract(
    LuvNFT.abi,
    "0x7c9D35047469dA7C83Bf8b54bccDDe174D0b8d19"
  );
  return contract;
};

//check svg generate.
async function generateSVG() {
  const contract = await getContract();
  const svgData=await contract.methods.getSVG(50,"90","290","Moscow").call();
  const image = extractJSONFromURI(svgData).image;
  console.log("svg: ", image);
}

generateSVG();
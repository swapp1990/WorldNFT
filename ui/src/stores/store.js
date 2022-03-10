//Initialize harmony contract: https://github.com/harmony-one/sdk/tree/master/packages/harmony-contract

// import React, { createContext, useReducer } from "react";
// import fs from "fs";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
// import LocationNFT from "../abi/LocationNFT.json";
// import Counter from "../abi/Counter.json";
import LuvNFT from "../abi/LuvNFT.json";

const Dispatcher = require("flux").Dispatcher;
const Emitter = require("events").EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

const BN = require("bn.js");

const { Harmony } = require("@harmony-js/core");
const { ChainID, ChainType } = require("@harmony-js/utils");
const hmy = new Harmony("https://api.s0.b.hmny.io", {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

const HMY_PRIVATE_KEY = process.env.REACT_APP_HMY_PRIVATE_KEY;
const HMY_RPC_URL = "https://api.s0.b.hmny.io";

class Store {
  constructor() {
    this.store = {
      account: null,
      category: null,
      price:null,
      priceLow: 0,
      priceHigh: 99999999,
      status: null,
      sort: null,
    };

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case "CONFIGURE":
            this.configure(payload);
            break;
          case "GET_NFT_BY_ID":
            this.getNftById(payload);
            break;
          case "SET_CATEGORY":
            this.setCategory(payload);
            break;
          case "SET_PRICE":
            this.setPrice(payload);
            break;
          case "SET_PRICE_RANGE":
            this.setPriceRange(payload);
            break;
          case "SET_STATUS":
            this.setStatus(payload);
            break;
          case "SET_SORT":
            this.setSort(payload);
            break;
          default: {
          }
        }
      }.bind(this)
    );
  }

  configureEthMetamask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Non-Eth browser detected");
      return;
    }
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    store.setStore({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    // let networkData = LocationNFT.networks[networkId];
    // if (networkData) {
    //   const dapp_contract = new web3.eth.Contract(
    //     LocationNFT.abi,
    //     networkData.address
    //   );
    //   store.setStore({ dapp_contract: dapp_contract });
    // }
  };
  configureHarmonyWeb3 = async () => {
    const web3 = new Web3(HMY_RPC_URL);
    let hmyMasterAccount =
      web3.eth.accounts.privateKeyToAccount(HMY_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(hmyMasterAccount);
    web3.eth.defaultAccount = hmyMasterAccount.address;
    const myAddress = web3.eth.defaultAccount;
    console.log("My address: ", myAddress);
    const balance = await web3.eth.getBalance(myAddress);
    console.log("My balance: ", balance / 1e18);
    store.setStore({ account: myAddress });
    const contractAddress = LuvNFT.networks["2"].address;
    console.log("LuvNFT contract", contractAddress);
    const abi = LuvNFT.abi;
    const dapp_contract = new web3.eth.Contract(abi, contractAddress);
    store.setStore({ dapp_contract: dapp_contract });
  };
  // configureHarmonyOneWallet = async () => {
  //   setTimeout(async () => {
  //     if (window.onewallet && window.onewallet.isOneWallet) {
  //       const onewallet = window.onewallet;
  //       const getAccount = await onewallet.getAccount();
  //       console.log("onewallet ", getAccount);
  //       store.setStore({ account: getAccount.address });
  //       const abi = LuvNFT.abi;
  //       const contractAddress = LuvNFT.networks["2"].address;
  //       console.log("LuvNFT contract", contractAddress);
  //       const contract = hmy.contracts.createContract(abi, contractAddress);
  //       console.log(contract.methods);
  //       store.setStore({ dapp_contract: contract });
  //     }
  //   }, 1000);
  // };

  signInMetamask = async () => {
    const provider = await detectEthereumProvider();
    if (provider !== window.ethereum) {
      console.error("Do you have multiple wallets installed?");
    }
    if (!provider) {
      console.error("Metamask not found");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x6357d2e0" }],
      });
      return true;
    } catch (error) {
      console.log("switch network error", error);
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Harmony Testnet",
                nativeCurrency: { name: "ONE", symbol: "ONE", decimals: 18 },
                chainId: "0x" + Number(1666700000).toString(16),
                rpcUrls: [`https://api.s0.b.hmny.io`],
                blockExplorerUrls: ["https://explorer.pops.one/"],
              },
            ],
          });
          return true;
        } catch (addError) {
          console.error("add network error", addError);
          return false;
        }
      }
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
    // provider.request({method: 'eth_requestAccounts'})

    // provider.request({
    //   method: 'wallet_addEthereumChain',
    //   params: [
    //     {
    //       chainId: '0x' + Number(1666700000).toString(16),
    //       chainName: `Harmony Testnet`,
    //       nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
    //       rpcUrls: [`https://api.s0.b.hmny.io`],
    //       blockExplorerUrls: ['https://explorer.pops.one/'],
    //     },
    //   ],
    // })
    // .then((result) => {
    //   console.log('result')
    //   return result
    // })
    // .catch((error) => {
    //   if (error.code === 4001) {
    //     // EIP-1193 userRejectedRequest error
    //     console.log("We can't encrypt anything without the key.");
    //   } else {
    //     console.error(error);
    //   }
    // });
  };

  sendTestTransaction = async (web3) => {
    const receiverAddress = "0x7c9D35047469dA7C83Bf8b54bccDDe174D0b8d19";
    const gas = 6721900;
    const gasPrice = new BN(await web3.eth.getGasPrice()).mul(new BN(1));

    const result = await web3.eth
      .sendTransaction({
        from: store.getStore().account,
        to: receiverAddress,
        value: 100 * 1e18, // 1ONE
        gasPrice,
        gas,
      })
      .on("error", console.error)
      .on("transactionHash", (transactionHash) => {
        alert(`Transaction is sending: ${transactionHash}`);
      });
    console.log(`Send tx: ${result.transactionHash} result: `, result.status);
  };

  configureHarmonyMetamask = async () => {
    // @ts-ignore
    await this.signInMetamask();
    if (!window.web3) {
      window.alert("No metamask found! Please install!");
      return;
    }
    const web3 = new Web3(window.web3.currentProvider);
    var accounts = await web3.eth.getAccounts();
    if (!accounts[0]) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      accounts = await web3.eth.getAccounts();
    }
    store.setStore({ account: accounts[0] });
    // this.sendTestTransaction(web3);
    // const contractAddress = LuvNFT.networks["2"].address;
    const contractAddress = LuvNFT.networks["1666700000"].address;
    const abi = LuvNFT.abi;
    const dapp_contract = new web3.eth.Contract(abi, contractAddress);
    store.setStore({ dapp_contract: dapp_contract });

    let tmpList = [];
    let nftCount = await dapp_contract.methods.nextId().call();
    for (let j = 0; j < nftCount; j++) {
      const nft = await dapp_contract.methods.getTokenDetails(j).call();
      tmpList.push(JSON.parse(nft.nft_info));
    }
    store.setStore({ nftList: tmpList });
  };

  configure = async (payload) => {
    // this.configureHarmonyOneWallet();
    this.configureHarmonyMetamask();
    // const gasPrice = new BN(await web3.eth.getGasPrice()).mul(new BN(1));
    // const gasLimit = 6721900;
    // const value = 1 * 1e18; // 1 ONE
    // console.log("configure ", window.onewallet);
    // setTimeout(async () => {
    //   if (window.onewallet && window.onewallet.isOneWallet) {
    //     const onewallet = window.onewallet;
    //     const getAccount = await onewallet.getAccount();
    //     console.log("onewallet ", getAccount.address);
    //     store.setStore({ account: getAccount.address });
    //     let contract = await this.initializeContract(onewallet);
    //     store.setStore({ dapp_contract: contract });
    //   }
    // }, 1000);
  };

  getNftById = async (payload) => {
    console.log("getNftById ", payload);
  };

  setCategory = async (payload) => {
    store.setStore({ category: payload.content });
  };
  setPrice = async (payload) => {
    store.setStore({ price: payload.content });
  };

  setPriceRange = async (payload) => {
    if (payload.content.length != 2) return;
    store.setStore({ priceLow: payload.content[0] });
    store.setStore({ priceHigh: payload.content[1] });
  };
  setStatus = async (payload) => {
    store.setStore({ status: payload.content });
  };
  setSort = async (payload) => {
    store.setStore({ sort: payload.content });
  };

  getStore() {
    return this.store;
  }

  setStore(obj) {
    this.store = { ...this.store, ...obj };
    return emitter.emit("StoreUpdated");
  }
}

const store = new Store();
const stores = {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter,
};
export default stores;

import React, { useState } from 'react';
import Web3 from 'web3';
import bip39 from 'bip39';
import bip32 from 'bip32';
import ethers from "ethers";

var bitcoin = require('bitcoinjs-lib')
const baddress = require('bitcoinjs-lib/src/address')
const bcrypto = require('bitcoinjs-lib/src/crypto')
const NETWORKS = require('bitcoinjs-lib/src/networks')
// let bip32utils = require('bip32-utils')

let web3 = new Web3("https://cloudflare-eth.com");


export const Account = () => {
  const [myBtcAddress, setMyBtcAddress] = useState(0);
  const [myBtcAddress2, setMyBtcAddress2] = useState(0);
  const [myBtcPrivateKey, setMyBtcPrivateKey] = useState(0);
  const [myEthAddress, setMyEthAddress] = useState(0);
  const [myEthPrivateKey, setMyEthPrivateKey] = useState(0);
  const [mnemonic, setMnemonic] = useState(0);

  function getAddress(node) {
    console.log("PrivateKey = " + node.toWIF().toString('hex'));
    console.log("PublicKey =" + node.publicKey.toString('hex'))
    return baddress.toBase58Check(bcrypto.hash160(node.publicKey), NETWORKS.bitcoin.pubKeyHash)
  }



  const createMyAccount = () => {
    var result = {
      success: true,
      message: "success",
      data: null
    }
    console.log(ethers);
    const mnemonic = bip39.generateMnemonic();

    console.log(mnemonic);


    //generate eth address
    var wallet = ethers.Wallet.fromMnemonic(mnemonic);
    result.data = {
      privateKey: wallet.privateKey,
      path: wallet.path,
      address: wallet.address,
      mnemonic: mnemonic
    }
    setMnemonic(result.data.mnemonic);

    var retVal = web3.eth.accounts.privateKeyToAccount(result.data.privateKey);

    setMyEthAddress(retVal.address);
    setMyEthPrivateKey(retVal.privateKey);

    console.log(result.data.privateKey);
    console.log(retVal.privateKey);
    console.log(result.data.address);
    console.log(retVal.address);

    //generate btc address


    console.log("mnemonic=" + mnemonic)
    var seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed);
    const child1 = root.derivePath("m/44'/0'/0'/0/0");
    var address = getAddress(child1);
    setMyBtcAddress(address);
    setMyBtcPrivateKey(child1.toWIF().toString('hex'));


    var address2 = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({ pubkey: child1.publicKey }),
    });

    console.log(address2.address);
    setMyBtcAddress2(address2.address);
  };





  return (
    <div>
      <button onClick={createMyAccount}>创建一个钱包</button>
      <p>助记词：{mnemonic}</p>
      <p>BTC普通地址是：{myBtcAddress}</p>
      <p>BTC隔离验证地址是：{myBtcAddress2}</p>
      <p>BTC私钥是：{myBtcPrivateKey}</p>
      <p>ETH地址是：{myEthAddress}</p>
      <p>ETH私钥是：{myEthPrivateKey}</p>
    </div>
  );
};

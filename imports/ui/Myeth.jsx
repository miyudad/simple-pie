import React, { useState } from 'react';
import Web3 from 'web3';
import bip39 from 'bip39';
import ethers from "ethers";

let web3 = new Web3("https://cloudflare-eth.com");

export const Myeth = () => {
  const [ethAmount, setEthAmount] = useState(0);
  const [myAddress, setMyAddress] = useState(1);
  const [myPrivateKey, setMyPrivateKey] = useState(2);
  const [mnemonic, setMnemonic] = useState(3);

  const ethAddr = '0x6e937fe4a9eecbb57c2f6812a4d52cc29f30e267';

  const getPrivatekeyWithMnemonic = (mnemonic) => {

    return hdNode.privateKey;
  };


  const getEthAmount = () => {
    web3.eth.getBalance(ethAddr).then(data => {
      // 从 resolve 获取正常结果
      console.log('正常：' + data);

      setEthAmount(web3.utils.fromWei(data, 'ether'));
    }).catch(data => {
      // 从 reject 获取异常结果
      console.log('异常：' + data);
    });

  };


  const createAccount = () => {
    var result = {
      success: true,
      message: "success",
      data: null
    }
    console.log(ethers);
    const mnemonic = bip39.generateMnemonic();

    console.log(mnemonic);

    var wallet = ethers.Wallet.fromMnemonic(mnemonic);
    result.data = {
      privateKey: wallet.privateKey,
      path: wallet.path,
      address: wallet.address,
      mnemonic: mnemonic
    }

    var retVal = web3.eth.accounts.privateKeyToAccount(result.data.privateKey);

    setMyAddress(retVal.address);
    setMyPrivateKey(retVal.privateKey);
    setMnemonic(result.data.mnemonic);

    console.log(result.data.privateKey);
    console.log(retVal.privateKey);
    console.log(result.data.address);
    console.log(retVal.address);
  };


  const getERC20Amount = () => {

    let minABI =
      [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "withdrawEther", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "burn", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "unfreeze", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "freezeOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "freeze", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "decimalUnits", "type": "uint8" }, { "name": "tokenSymbol", "type": "string" }], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Freeze", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Unfreeze", "type": "event" }];
    const address = "0xd46ba6d942050d489dbd938a2c909a5d5039a161";
    let contract = new web3.eth.Contract(minABI, address);
    var balanceV;
    contract.methods.balanceOf(ethAddr).call().then(v => {
      contract.methods.decimals().call().then(d => {
        console.log(v);
        console.log(d);
        let ret = new BigNumber(v);
        balanceV = ret.dividedBy(10 ** d);
        console.log(balanceV.toString());
      });
    }).then(sum => {
    })
  }

  const getERC20Amount2 = () => {
    fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xd46ba6d942050d489dbd938a2c909a5d5039a161&address='+ethAddr+'&tag=latest&apikey=KBR4TPKI88DP97KN7QAC8B6F6D3IQSWJE6')
              .then(result => result.json())
             .then(result => {
                 if (result.status == 1) {
                      let ret = new BigNumber(result.result);
                   console.log(ret.dividedBy(10**9).toString());
        
                  }
              })
              .catch(e => {
 
             })
  }

  const getETHPrice = () => {
    fetch('https://api.etherscan.io/api?module=proxy&action=eth_gasPrice&apikey=KBR4TPKI88DP97KN7QAC8B6F6D3IQSWJE6')
              .then(result => result.json())
             .then(result => {
                 let parseIntresult = parseInt(result.result, 16)
                 console.log(parseIntresult);
              })
              .catch(e => {
 
             })
  }

  const getERC20Price = () => {
      fetch('https://api.gateio.ws/api/v4/spot/tickers?currency_pair=AMPL_USDT', { mode: 'no-cors' })
              .then(result => result.json())
             .then(result => {
                console.log(result); 
              }).catch(function(error) {  
                console.log('Request failed', error)  
              });
  }


  return (
    <div>
      <button onClick={getEthAmount}>Click Me To Know Your ETH Assets</button>
      <p>Your ETH balance is  {ethAmount} ETH.</p>
      <button onClick={createAccount}>创建一个钱包</button>
      <p>地址是：{myAddress}</p>
      <p>私钥是：{myPrivateKey}</p>
      <p>助记词：{mnemonic}</p>
      <p><button onClick={getERC20Amount}>Click Me To Know Your AMPL Assets</button></p>
      <p><button onClick={getERC20Amount2}>Click Me To Know Your AMPL Amount</button></p>
      <p><button onClick={getETHPrice}>Click Me To Know Your ETH Price</button></p>
      <p><button onClick={getERC20Price}>Click Me To Know Your ERC20 Price</button></p>
    </div>
  );
};

import React, { useState } from 'react';
import Web3 from 'web3';
import bip39 from 'bip39';
import ethers from "ethers";

var Tx = require('ethereumjs-tx').Transaction;

let web3 = new Web3("https://cloudflare-eth.com");
let minABI =
  [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "amount", "type": "uint256" }], "name": "withdrawEther", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "burn", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "unfreeze", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "freezeOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "freeze", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "inputs": [{ "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "decimalUnits", "type": "uint8" }, { "name": "tokenSymbol", "type": "string" }], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Freeze", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Unfreeze", "type": "event" }];

//TODO
const contractAddress = "0xD46bA6D942050d489DBd938a2C909A5d5039A161"
const yourPrivateKey = ''//没有0x的，与下面的fromAddress是一起的
const fromAddress = ''
const toAddress = ''
const etherscanApiKey = ''

export const Myeth = () => {
  const [ethAmount, setEthAmount] = useState(0);
  const [myAddress, setMyAddress] = useState(0);
  const [myPrivateKey, setMyPrivateKey] = useState(0);
  const [mnemonic, setMnemonic] = useState(0);


  /**
   * 获得ETH数量
   */
  const getEthAmount = () => {
    web3.eth.getBalance(toAddress).then(data => {
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


  /**
   * web3的API获取token数量
   */
  const getERC20Amount = () => {
    let contract = new web3.eth.Contract(minABI, contractAddress);
    var balanceV;
    contract.methods.balanceOf(toAddress).call().then(v => {
      contract.methods.decimals().call().then(d => {
        console.log(v);
        console.log(d);
        let ret = new BigNumber(v);
        balanceV = ret.dividedBy(10 ** d);
        console.log("balance=" + balanceV.toString());
        console.log("decimal=" + d);
      });
    }).then(sum => {
    })
  }


  /**
   * 通过etherscan获取token数量
   */
  const getERC20Amount2 = () => {
    fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=' + contractAddress + '&address=' + toAddress + '&tag=latest&apikey=' + etherscanApiKey)
      .then(result => result.json())
      .then(result => {
        if (result.status == 1) {
          let ret = new BigNumber(result.result);
          console.log(ret.dividedBy(10 ** 9).toString());
        }
      })
      .catch(e => {

      })
  }


  /**
   * ETH Transfer 0.01个eth
   */
  async function ethTransfer() {
    //以0x打头的privateKey字符串
    const privateKey = '0x' + yourPrivateKey;
    var mywallet = new ethers.Wallet(privateKey);
    const txAmount = "0.01";
    // var mywallet = ethers.Wallet.fromMnemonic(yourMnemonic);
    console.log(mywallet.address);
    tx = {
      to: toAddress,
      value: ethers.utils.parseEther(txAmount)
    }
    mywallet = mywallet.connect(ethers.getDefaultProvider());
    mywallet.sendTransaction(tx);
  };


  /**
   * ERC20 Token Transfer 100个ampl
   */
  async function tokenTransfer() {
    const myContract = new web3.eth.Contract(minABI, contractAddress);

    var fromBalance = await myContract.methods.balanceOf(fromAddress).call();
    console.log("fromBalance=" + fromBalance);

    return new Promise(function (resolve, reject) {
      try {
        web3.eth.getBlock("latest", false, (error, result) => {
          console.log('gas limit: ' + result.gasLimit)
          var _gasLimit = result.gasLimit;

          web3.eth.getGasPrice(function (error, result) {
            console.log('gas price: ' + result);
            var _gasPrice = result;
            //transfer actual amount
            let amount = web3.utils.toBN(100);
            //9为decimal，精度
            let value = amount.mul(web3.utils.toBN(10).pow(web3.utils.toBN(9)));

            console.log("transferAmount=" + value)

            var _hex_gasLimit = web3.utils.toHex(_gasLimit.toString());
            var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
            var _hex_value = web3.utils.toHex(value);
            //var _trx_count = web3.eth.getTransactionCount(_from);
            var _hex_Gas = web3.utils.toHex('50000'); //web3.utils.toWei('1', 'Gwei')

            console.log('BEGIN------------------------------------------');
            web3.eth.getTransactionCount(fromAddress).then(
              nonce => {

                var _hex_nonce = web3.utils.toHex(nonce);
                var rawTx = {
                  nonce: _hex_nonce,
                  to: contractAddress,
                  from: fromAddress,
                  gasLimit: _hex_gasLimit,
                  gas: _hex_Gas,
                  gasPrice: _hex_gasPrice,
                  value: web3.utils.toHex(0),
                  data: '0x00'
                }
                rawTx.data = myContract.methods.transfer(toAddress, _hex_value).encodeABI();


                const tx = new Tx(rawTx);
                const privateKey = Buffer.from(yourPrivateKey, 'hex')
                tx.sign(privateKey);

                var serializedTx = '0x' + tx.serialize().toString('hex');
                web3.eth.sendSignedTransaction(serializedTx.toString('hex'), function (err, hash) {
                  if (err) {
                    resolve(err);
                    console.log('ERR------------------------------------------');
                  }
                  else {
                    resolve('Txn Sent and hash is ' + hash);
                    console.log('OK------------------------------------------');
                  }
                });
              })
          });
        });
      } catch (error) {
        resolve(error);
      }
    })
  }
  return (
    <div>
      <button onClick={getEthAmount}>Click Me To Know Your ETH Assets</button>
      <p>Your ETH balance is  {ethAmount} ETH.</p>
      <button onClick={createAccount}>创建一个钱包</button>
      <p>地址是：{myAddress}</p>
      <p>私钥是：{myPrivateKey}</p>
      <p>助记词：{mnemonic}</p>
      <p><button onClick={getERC20Amount}>Click Me To Know Your AMPL Assets-web3</button></p>
      <p><button onClick={getERC20Amount2}>Click Me To Know Your AMPL Amount--ETHERSCAN.io</button></p>
      <p><button onClick={ethTransfer}>Click Me To Transfer ETH</button></p>
      <p><button onClick={tokenTransfer}>Click Me To Transfer Token（here is AMPL）</button></p>
    </div>
  );
};

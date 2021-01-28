# 一个学习记录
some code based on web3 and meteor  which show some demos to access ethereum

## 框架搭建：
基于Meteor框架的nodejs程序

## 主要功能：
1. 讀取ETH链上地址的ETH币和TOKEN数量
2. 生成一个Ethereum冷钱包的，不触网，包含址/私钥/助记词，摆脱对市面上imtoken等钱包的担忧。
3. 实现了对gate的API，Uniswap的API的一些交互，算是对DEFI有个入门的认识

## 用到的主要依赖包：
1. web3
2. bip39
3. ethers
3. @uniswap/sdk
4. gate-api

以上都用npm install --save的形式进行安装添加

## metetor常见命令：
1. meteor 启动服务器
  meteor
2. geth启动命令
 * 打开iterm程序，切到geth所在文件夹，输入./geth --rpc --rpccorsdomain "http://localhost:3000"

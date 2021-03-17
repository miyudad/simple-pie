# 一个学习记录
some code based on web3 and meteor  which show some demos to access ethereum

## 框架搭建：
基于Meteor框架的nodejs程序

### meteor框架的安装
* 本来按照官网是执行$curl https://install.meteor.com | sh就行，但是总是卡壳
* 但是要注意，有一个包（meteor-bootstrap-os.osx.x86_64.tar.gz）需要提前下载下来，放在指定目录下，然后修改一下安装命令文件meteor.install.sh（安装命令已上传）
修改的地方是135行注释掉，新加了136行，文件指向本地地址，然后保存，执行./meteor.install.sh即可
* 参考网址：https://chilunyc.com/blog/405
* meteor create MyApp  创建一个项目

## 主要功能：
1. 讀取ETH链上地址的ETH币和TOKEN数量
2. 生成一个BTC/Ethereum冷钱包，不触网，包含址/私钥/助记词，摆脱对市面上imtoken等钱包的担忧。一套助记词搞定btc和eth系
3. 实现了对gate的API，Uniswap的API的一些交互，算是对DEFI有个入门的认识
4. 实现了ETH的转账，利用ethers的包完成的
5. 实现了ERC20 Token的转账，利用web3和ethereumjs-tx的包完成的，这里踩了一个巨坑，主要是因为包的更新换代太快了，很多例子都是基于老版本的包
* 坑1:Transaction包的引用，google或者百度很多例子都是直接var Tx = require('ethereumjs-tx')，这样引用就会报Type  Tx is not a constructor的错误，而最新版的包要求这样引用：var Tx = require('ethereumjs-tx').Transaction;
* 坑2:调用web3生成nonce时，需要时异步方式或者在回调里进行下一步操作，不然转账虽然不出错，但是并不上链。
* 坑3:转账数量，需要和精度配合
* 坑4:txData的构造，toAddress要是合约地址，value需要为0，究其原理：ERC20的转账，其实是发起一个ETH为0的ETH转账请求给合约地址，由合约来完成给目标地址的Token转账

## 其他用到的主要依赖包：
1. web3  访问eth网络的一个初步封装的nodejs API库库
2. bip39  助记词相关的一个nodejs包
3. ethers  访问eth网络的一个封装的比较好的nodejs API库
3. @uniswap/sdk  访问uniswap的一个nodejs API库
4. gate-api  访问gate.io的nodejs API库

以上都用npm install --save的形式进行安装添加

## metetor常见命令：
  * meteor 启动服务器
  * ctrl+c 停止服务器
## geth启动命令：
  * 先下载一个geth到本地目录
  * 打开iterm程序，切到geth所在文件夹，输入./geth --rpc --rpccorsdomain "http://localhost:3000"
  * 这个命令的作用是在本地建立一个ethereum节点，作为整个以太坊网络的一个分布式节点，这样我们有时候（比如web3）需要与节点通讯的时候，就不需要找第三方了。当然如果你偷懒，不想在本地运行这个服务，也可以的。
  * 正规的开发团队，都是专门搞个服务器来建立一个这样的节点

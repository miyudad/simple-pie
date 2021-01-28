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
2. 生成一个Ethereum冷钱包的，不触网，包含址/私钥/助记词，摆脱对市面上imtoken等钱包的担忧。
3. 实现了对gate的API，Uniswap的API的一些交互，算是对DEFI有个入门的认识

## 其他用到的主要依赖包：
1. web3
2. bip39
3. ethers
3. @uniswap/sdk
4. gate-api

以上都用npm install --save的形式进行安装添加

## metetor常见命令：
  * meteor 启动服务器
  * ctrl+c 停止服务器
2. geth启动命令：
  * 先下载一个geth到本地目录
  * 打开iterm程序，切到geth所在文件夹，输入./geth --rpc --rpccorsdomain "http://localhost:3000"
  * 这个命令的作用是在本地建立一个ethereum节点，作为整个以太坊网络的一个分布式节点，这样我们有时候（比如web3）需要与节点通讯的时候，就不需要找第三方了。当然如果你偷懒，不想在本地运行这个服务，也可以的。
  * 正规的开发团队，都是专门搞个服务器来建立一个这样的节点

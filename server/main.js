import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
const GateApi = require('gate-api');
const client = new GateApi.ApiClient();
// uncomment the next line to change base path
// client.basePath = "https://some-other-host"

const api = new GateApi.SpotApi(client);
const settle = "usdt"; // 'usdt' | Settle currency
function insertLink({ title, url }) {
  LinksCollection.insert({ title, url, createdAt: new Date() });
}
WebApp.rawConnectHandlers.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink({
      title: 'Do the Tutorial',
      url: 'https://www.meteor.com/tutorials/react/creating-an-app'
    });

    insertLink({
      title: 'Follow the Guide',
      url: 'http://guide.meteor.com'
    });

    insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com'
    });

    insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com'
    });
  }


  api.listTickers({ 'currencyPair': "BTC_USDT" })
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("BTC/USDT价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });

  api.listTickers({ 'currencyPair': "LTC_USDT" })
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("LTC/USDT价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });

  opts = {
    'currencyPair': "EOS_USDT" // string | Currency pair
  };
  api.listTickers(opts)
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("EOS/USDT价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });


  api.listTickers({ 'currencyPair': "ATOM_USDT" })
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("ATOM/USDT价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });


  api.listTickers({ 'currencyPair': "DOT_USDT" })
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("DOT/USDT价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });

  api.listTickers({ 'currencyPair': "ETH_USDT" })
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("ETH/USDT价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });
  api.listTickers({ 'currencyPair': "LTC_BTC" })
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("LTC/BTC价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });
  api.listTickers({ 'currencyPair': "ETH_BTC" })
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("ETH/BTC价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });
  api.listTickers({ 'currencyPair': "DOT_BTC" })
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("DOT/BTC价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });

  api.listTickers({ 'currencyPair': "ATOM_BTC" })
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("ATOM/BTC价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });
  api.listTickers({ 'currencyPair': "EOS_BTC" })
    .then(value => value.body)
    .then(value => {
      var jsonObj = JSON.parse(JSON.stringify(value));
      var obj = JSON.stringify(jsonObj);
      var realStr = obj.substring(1, obj.length - 1);
      var realObj = JSON.parse(realStr);
      console.log("EOS/BTC价格是：" + realObj.last);
    }).catch(function (error) {
      console.log('Request failed', error)
    });
});

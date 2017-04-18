/* 1.deploey Contract then
1.call:getData()
then receive event:dataGet,
then 2.call setData()
then receive event:dataSet
*/

const path = require('path')
const fs = require('fs')
const provider = "http://localhost:8545"

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(provider))


const EventEmitter = require('events')
const emitter = new EventEmitter()

const {defineSupportCode} = require('cucumber');
var assert = require('assert');

let datastorage_address

const DataStorage_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','build', 'DataStorage.abi')))
const DataStorage_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..','..', 'build', 'DataStorage.bin')).toString()

const datastorageContract = web3.eth.contract(DataStorage_abi)

/*---------以下註解程式碼為：部署Contract,then 呼叫 setData() , then 接收 event : event:dataSet
並且將接收的資料存進 writeText後 寫入 message.txt----------*/

  let writeText;
  datastorageContract.new(
     {
       from: web3.eth.accounts[0],
       data:DataStorage_bytecode,
       gas: '4700000'
     },
     function (e, contract){
       if(e)console.log(e);
       if (typeof contract.address !== 'undefined') {
          //console.log(web3.eth.getCode(contract.address));
          console.log('Contract mined! address: ' + contract.address );
           datastorage = web3.eth.contract(DataStorage_abi).at(contract.address)
           //console.log(datastorage);
           console.log('setData():-------------------------------------------');
           writeText='setData():-------------------------------------------'
           datastorage.setData('test' ,{
                  from: web3.eth.coinbase,
                  gas: 44444444
                }, (err, txhash) => {
                  if (err !== undefined && err !== null) console.log(err);
                  else {
                    var event = datastorage.dataSet( (err, result) => {
                      if (err !== undefined && err !== null) console.log(err);
                      else {
                        //console.log('result:');
                        //console.log(result);
                        console.log('from:'+result.args.from);
                        console.log('input:'+result.args.input);
                        console.log('timestamp:'+result.args.timestamp);
                        writeText+='\nfrom:'+result.args.from + '\nowner:'+result.args.input + '\ntimestamp:'+result.args.timestamp
                        event.stopWatching()
                        fs.writeFile('message.txt', writeText, (err) => {
                        if (err) throw err;});
                      }
                    })
                  }
                })
              }
            })


/*---------以下註解程式碼為：部署Contract,then 呼叫 getData(), then 接收 event:dataGet , then 呼叫 setData() , then 接收 event : event:dataSet
並且將接收的資料存進 writeText後 寫入 message.txt----------*/
/*let writeText;

  var datastorage = datastorageContract.new(
     {
       from: web3.eth.accounts[0],
       data:DataStorage_bytecode,
       gas: '4700000'
     }, function (e, contract){
       if(e)console.log(e);
       if (typeof contract.address !== 'undefined') {
          //console.log(web3.eth.getCode(contract.address));
          console.log('Contract mined! address: ' + contract.address );
           datastorage = web3.eth.contract(DataStorage_abi).at(contract.address)
           //console.log(datastorage);
           console.log('getData():-------------------------------------------');
           writeText='getData():-------------------------------------------'
           datastorage.getData({
           				from: web3.eth.coinbase,
           				gas: 44444444
           			}, (err, txhash) => {
           				if (err !== undefined && err !== null) console.log(err);
           				else {
           					var event = datastorage.dataGet( (err, result) => {
           						if (err !== undefined && err !== null) console.log(err);
           						else {
                        //console.log('result:');
                        //console.log(result);
                        console.log('from:'+result.args.from);
                        console.log('owner:'+result.args._owner);
                        console.log('timestamp:'+result.args.timestamp);
                        writeText+='\nfrom:'+result.args.from + '\nowner:'+result.args._owner + '\ntimestamp:'+result.args.timestamp
           							event.stopWatching()
                        console.log('setData():-------------------------------------------');
                        writeText+='\nsetData():-------------------------------------------'
                        datastorage.setData('test' ,{
                               from: web3.eth.coinbase,
                               gas: 44444444
                             }, (err, txhash) => {
                               if (err !== undefined && err !== null) console.log(err);
                               else {
                                 var event = datastorage.dataSet( (err, result) => {
                                   if (err !== undefined && err !== null) console.log(err);
                                   else {
                                     //console.log('result:');
                                     //console.log(result);
                                     console.log('from:'+result.args.from);
                                     console.log('input:'+result.args.input);
                                     console.log('timestamp:'+result.args.timestamp);
                                     writeText+='\nfrom:'+result.args.from + '\nowner:'+result.args.input + '\ntimestamp:'+result.args.timestamp
                                     event.stopWatching()
                                     fs.writeFile('message.txt', writeText, (err) => {
                                     if (err) throw err;});
                                   }
                                 })
                               }
                             })
                           }
                         })
                       }
                     })
                   }
                 })*/

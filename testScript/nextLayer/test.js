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
           							event.stopWatching()
                        console.log('setData():-------------------------------------------');
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
                                     event.stopWatching()
                                   }
                                 })
                               }
                             })
                           }
                         })
                       }
                     })
                   }
                 })

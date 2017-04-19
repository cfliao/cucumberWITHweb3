
const {defineSupportCode} = require('cucumber');

const path = require('path')
const fs = require('fs')
const provider = "http://localhost:8545"

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(provider))


defineSupportCode(function({Given, When, Then, And}) {

  let DataStorage_abi
  let DataStorage_bytecode
  let datastorage_address
  let datastorageContract
  let Contract
  Given('I have abi and byteCode', function (callback) {
  // Write code here that turns the phrase above into concrete actions


   DataStorage_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','build', 'DataStorage.abi')))
   DataStorage_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..','..', 'build', 'DataStorage.bin')).toString()
   datastorageContract = web3.eth.contract(DataStorage_abi)

   if (!DataStorage_abi) {
     throw new Error('DataStorage_abi = ' + DataStorage_abi);
   }
   else if (!DataStorage_bytecode ) {
   throw new Error('DataStorage_bytecode = ' + DataStorage_bytecode);
 }
   else if (!datastorageContract) {
   throw new Error('datastorageContract = ' + datastorageContract);
 }

   //return fs.writeFile('message.txt', writeText)
   callback()
  });

  When('I deploey the Contract',{timeout: -1}, function (callback) {
  // Write code here that turns the phrase above into concrete actions


    var datastorage = datastorageContract.new({
      from: web3.eth.accounts[0],
      data:DataStorage_bytecode,
      gas: '4700000'
    },function(err, contract){
      if (typeof contract.address !== 'undefined') {
        datastorage_address=contract.address
        callback()
      }
      if (err) {
        throw new Error(e)
      }
    });


  });

  Then('I should get address and write to file successfully', function (callback) {
  // Write code here that turns the phrase above into concrete actions

  if (datastorage_address){
    fs.writeFile(path.resolve(__dirname, '..', '..','build', 'contract.address'), '\'' + datastorage_address + '\'', (err) => {
      if (err) throw err;
      callback();

    });
  }
  else {
    throw new Error('datastorage_address is null')
  }

  });

  Given('the deployed Contract in ethereum',{timeout: -1},function (callback) {
    // Write code here that turns the phrase above into concrete actions
    DataStorage_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','build', 'DataStorage.abi')))
    fs.readFile(path.resolve(__dirname, '..', '..','build', 'contract.address'), (err, data) => {
      if (err) throw err;
      datastorage_address=data
    });

    if (!datastorage_address) {
      throw new Error('datastorage_address = ' + datastorage_address);
    }
    else {
      Contract = web3.eth.contract(DataStorage_abi).at(datastorage_address)
      callback()
    }

  });

 When('I call Contract setData function to put {Data} in ethereum',{timeout: -1},function (Data,callback) {

    Contract.setData(Data ,{
           from: web3.eth.coinbase,
           gas: 44444444
         }, (err, txhash) => {
           if (err !== undefined && err !== null) throw err;
           else {
             var event = Contract.dataSet( (err, result) => {
               if (err !== undefined && err !== null) throw err;
               else {
                 event.stopWatching()
                 fs.appendFile('eventLOG', JSON.stringify(result), (err) => {
                   if (err) throw err;
               });
             callback()
           }
         })
       }
     })
  });

  Then('I call Contract get Data function to get  {Data}',{timeout: -1},function (Data,callback) {
    Contract.getData({
      from: web3.eth.coinbase,
      gas: 44444444
    }, (err, txhash) => {
      if (!err){
          if (txhash==Data) callback()
      }
      if (err !== undefined && err !== null) throw err;
    });
  });
});

const path = require('path')
const fs = require('fs')
const provider = "http://localhost:8545"
const {defineSupportCode} = require('cucumber');
var assert = require('assert');

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

const EventEmitter = require('events')
const emitter = new EventEmitter()


let datastorage_address

const DataStorage_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'DataStorage.abi')))
const DataStorage_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, 'DataStorage.bin')).toString()

const datastorageContract = web3.eth.contract(DataStorage_abi)

defineSupportCode(function({Given, When, Then, And}) {
  //let request=exchangRequest.newRequest();
  Given('the exchange rate is {alp}alp={blp}blp', function (alp, blp,callback) {

  // Write code here that turns the phrase above into concrete actions
  //Code.the_exchange_rate_is_alp_blp(alp,blp);


//用以下此方法呼叫testrpc顯示可以部署,但此方法回傳值卻沒有Contract address//
  var datastorage = datastorageContract.new({
    from: web3.eth.accounts[0],
    data:DataStorage_bytecode,
    gas: '4700000'
  });
  //除非先部署好得到address ex: 0xce0af20cc6da2791de438fb1f95e7c262487869e
  datastorage = web3.eth.contract(DataStorage_abi).at('0xce0af20cc6da2791de438fb1f95e7c262487869e')

  let result = datastorage.setData('test',{
    from: web3.eth.coinbase,
    gas: 44444444
  })

  var event = datastorage.dataSet( (err, result) => {
    ///這裡面的東西完全不會執行 因為在這裡似乎是沒有return東西
         if (err !== undefined && err !== null) console.log(err);
         else {
           console.log('from:'+result.args.from);
           console.log('input:'+result.args.input);
           console.log('timestamp:'+result.args.timestamp);
           event.stopWatching()
         }
       }
     )

  //console.log(Contract);




/*---------以下註解程式碼為：部署Contract,then 呼叫 setData() , then 接收 event : event:dataSet
並且將接收的資料存進 writeText後 寫入 message.txt----------*/
/*
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
*/
  callback();
  });

  Given('original alp account of A is {originalAlp}', function (originalAlp,callback) {
  // Write code here that turns the phrase above into concrete actions
  //  console.log('originalAlp:'+originalAlp);
  //Code.original_alp_account_of_A_is(originalAlp);

  //像這樣寫就可以
  function waitingforyou(callback) {
      /* Do something */
      data = 'plz run deploy or do something';

      if (!data)
          callback(new Error('Something\'s Wrong'));
      else
          callback(null, data);
  }
  
  waitingforyou(function(err,callback) {
    console.log(callback)
  })

  callback();
  });

  Given('original blp account of A is {originalBlp}', function (originalBlp,callback) {
    // Write code here that turns the phrase above into concrete actions

    //Code.original_blp_account_of_A_is(originalBlp)
    //console.log('originalAlp:'+originalBlp);
    callback();
  });

  Given('original alp account of B is {originalAlp}', function (originalAlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    //Code.original_alp_account_of_B_is(originalAlp)
    //console.log('originalAlp:'+originalAlp);
    callback();
  })


  Given('original blp account of B is {originalBlp}', function (originalBlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    //Code.original_blp_account_of_B_is(originalBlp)
    //console.log('originalAlp:'+originalBlp);
    callback();
  });

  When('A want to exchange {exchangingAlp} alp for blp', function (exchangingAlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    //Code.a_want_to_exchange_alp_for_blp(exchangingAlp)
    //console.log('originalAlp:'+exchangingAlp);
    callback();
  });

  Then('alp account of A should be {resultAlp}', function (resultAlp,callback) {
  // Write code here that turns the phrase above into concrete actions
  //Code.alp_account_of_A_should_be(resultAlp)

  //console.log('originalAlp:'+resultAlp);
  callback();
  });


  Then('blp account of A should be {resultBlp}', function (resultBlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    //Code.blp_account_of_A_should_be(resultBlp)

    //console.log('originalAlp:'+resultBlp);
    callback();
  });

  Then('alp account of B should be {resultBlp}', function (resultBlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    //Code.alp_account_of_B_should_be(resultBlp)

    //console.log('originalAlp:'+resultBlp);
    callback();
  });


  Then('blp account of B should be {resultBlp}', function (resultBlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    //Code.blp_account_of_B_should_be(resultBlp)
    //console.log('originalAlp:'+resultBlp);
    callback();
  });



});

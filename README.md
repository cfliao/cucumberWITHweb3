# cucumberWITHweb3

### testrpc

1. 安裝

  ```npm install -g node-gyp```

  ```npm install -g ethereumjs-testrpc```

2. 執行Testrpc

  ```testrpc -p 8545 -l 888888888```
  
### compile contract and generate stub (solcjs@0.4.8)

1. ```switch to project root dir``` 
2. ```mkdir build``` (one time)
3. ```npm run solc```


### execute cucumberjs ###

1. ```make sure you have run "testrpc -l 888888888 -p 8545"```
2. ```switch to project root dir```
3. ```npm run cucumber```

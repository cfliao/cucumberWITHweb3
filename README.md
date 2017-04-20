# cucumberWITHweb3

### testrpc

1. 安裝

  ```npm install -g node-gyp```

  ```npm install -g ethereumjs-testrpc```

2. 執行

  ```testrpc -p 8545 -l 88888888```
  
### compiler contract (solcjs@0.4.8)

1. ```mkdir build``` (one time)
2. ```cd Contract```
3. ```npm install``` (one time)
4. ```npm run solc```


### start ###

0. ```testrpc -l 88888888 -p 8545``` or connect to private chain
1. Run ```./node_modules/.bin/cucumber-js```

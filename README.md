# cucumberWITHweb3

### testrpc

1. 安裝

  ```npm install -g node-gyp```

  ```npm install -g ethereumjs-testrpc```

2. 執行

  ```testrpc -p 8545 -l 88888888```
  
### compile contract and produce stubs (solcjs@0.4.8)

1. ```mkdir build``` (one time)
2. ```cd Contract```
3. ```npm install``` (one time)
4. ```npm run solc```


### running cucumber ###

1. ```testrpc -l 88888888 -p 8545``` or connect to private chain
2. ```goto root directory```
3. ```npm run cucumber```

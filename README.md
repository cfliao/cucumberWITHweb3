# cucumberWITHweb3

### testrpc

1. 安裝

  ```npm install -g node-gyp```

  ```npm install -g ethereumjs-testrpc```

2. 執行

  ```testrpc -p 8545 -l 88888888```
  
### compile contract and produce stubs (solcjs@0.4.8)

1. ```cd Contract```
2. ```mkdir build``` (one time)
3. ```cd build_script``` 
4. ```npm install -g solc@0.4.8 && npm install``` (one time)
5. ```npm run solc```


### running cucumber ###

1. ```testrpc -l 88888888 -p 8545``` or connect to private chain
2. ```goto root directory```
3. ```npm run cucumber```

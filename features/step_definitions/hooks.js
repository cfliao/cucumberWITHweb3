var {defineSupportCode} = require('cucumber');

defineSupportCode(function({After, Before}) {
  // Synchronous
  Before(function (callback) {
  });

  // Asynchronous Promise
  After(function () {
    // Assuming this.driver is a selenium webdriver
  //  return this.driver.quit();
  });
});

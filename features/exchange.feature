Feature: get function returns from contract
  In order to get data from ethereum
  As a user
  I want to get data from Contract

  Scenario: deploey Contract
    Given I have abi and byteCode
    When I deploey the Contract
    Then I should get address and write to file successfully

  Scenario Outline: Contract call
    Given the deployed Contract in ethereum
    When I call Contract setData function to put <put Data> in ethereum
    Then I call Contract get Data function to get  <get Data>

    Examples:
    | put Data |  get Data  |
    | first   |  first    |
 # do we allow floating point alp and blp?

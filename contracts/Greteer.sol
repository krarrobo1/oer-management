// SPDX-License-Identifier: MIT
 pragma solidity >=0.4.16 <0.9.0;


contract Greeter{
    string greeting = "Hello world";

    function set(string memory _greeting) public{
        greeting = _greeting;
    }

    function get() public view returns (string memory){
        return greeting;
    }
}
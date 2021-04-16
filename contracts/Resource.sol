// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

import "./ResourceManager.sol";

contract Resource{
    // ENUMS
    // Used for teaching, learning, research
    enum Usage{Teaching, Learning, Research}
    // Made (enhacement, translation) adaptations
    enum Adaptation{Enhacement, Translation, Reference}
    // CC0 Public domain/ BY Attribution / SA Share alike / NC Non commercial
    enum License{CC0, BY, BYSA, BYNC}

    modifier notVoted (address _voter) { require(hasVoted[_voter] == false, "The user has already voted"); _;}
    
    // Events
    event ReuseEvent(address _consumer, Usage _usageType, string _comment);
    event AdaptationEvent(address _consumer, Adaptation _adaptationType, string _adaptationHash);


    string public id; // ipfs hash
    ResourceManager parentContract;
    License public license;
    mapping (address=>bool) hasVoted;
    uint public upVotes;
    uint public downVotes;

    constructor(ResourceManager _parentContract, string memory _id, License _license){
        parentContract = _parentContract;
        id = _id;
        license = _license;
    }

    // Registro de uso
    function registerUsage(Usage _usageType, string memory _comment) public{
        emit ReuseEvent(msg.sender, _usageType, _comment);
    }

    // Registro de adaptacion
    function registerAdaptation(Adaptation _adaptationType, string memory _adaptationHash) public{
        emit AdaptationEvent(msg.sender, _adaptationType, _adaptationHash);
    }

    // Votos
    function upVote() public notVoted(msg.sender){
        hasVoted[msg.sender] = true;
        upVotes++;
    }
    function downVote() public notVoted(msg.sender){
        hasVoted[msg.sender] = true;
        downVotes++;
    }
}
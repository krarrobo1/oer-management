// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;


contract ResourceTracker{
   
    mapping (address=>bool) hasVoted;
    uint public upVotes;
    uint public downVotes;

    enum Usage{Teaching, Learning, Research}
    enum Adaptation{Enhacement, Translation}
   

    modifier notVoted (address _voter) { require(hasVoted[_voter] == false, "The user has already voted"); _;}
    
    // Events
    event UsageEvent(address _consumer, Usage indexed _usageType, string _comment);
    event AdaptationEvent(address _consumer, Adaptation indexed _adaptationType, string _comment);
    event SocialEvent(address _consumer, bool positive, string _comment);

    // Registro de uso
    function registerUsage(Usage _usageType, string memory _comment) public{
        emit UsageEvent(msg.sender, _usageType, _comment);
    }

    // Registro de adaptacion
    function registerAdaptation(Adaptation _adaptationType, string memory _adaptationHash) public{
        emit AdaptationEvent(msg.sender, _adaptationType, _adaptationHash);
    }

    // Registro de Votos
    function upVote(string memory _comment) public notVoted(msg.sender){
        hasVoted[msg.sender] = true;
        upVotes++;
        emit SocialEvent(msg.sender, true, _comment);
    }

    function downVote(string memory _comment) public notVoted(msg.sender){
        hasVoted[msg.sender] = true;
        downVotes++;
        emit SocialEvent(msg.sender, false, _comment);
    }
}
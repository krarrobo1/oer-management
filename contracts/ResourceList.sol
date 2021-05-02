// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

import "./ResourceTracker.sol";

contract ResourceList{

    struct Resource{
        address owner;
        address tracker;
        uint256 id;
        uint256 timestamp;
        bytes32 filename; 
        bytes32 subject; 
        bytes32 materialType;
        bytes32 license; 
        bytes32 language;
        bytes32[5] tags;
        string ipfshash;
    }

    uint256 public constant maxAmountOfFiles = 1000;

    // Owner => resources
    mapping(address => Resource[maxAmountOfFiles]) public resources;

    // Owner => last files id
    mapping(address => uint256) public lastIds;

    /// @dev main event for smart contract, needed for drizzle to update list of files
    event fileAdded (uint256 fileid, string ipfshash, bytes32 _filename);
    event tagsAdded (bytes32[5] tags);


   function addFile(
       bytes32 _filename, 
       bytes32 _subject, 
       bytes32[5] memory  _tags, 
       bytes32  _materialType,
       bytes32  _license,
       bytes32  _language,
       string memory _ipfsHash
       ) public {
 
      // tracker
      ResourceTracker tracker = new ResourceTracker();
      
      Resource memory myFile = Resource(msg.sender, address(tracker),lastIds[msg.sender], block.timestamp, _filename, _subject, _materialType, _license, _language, _tags, _ipfsHash);
      // emit tagsAdded (myFile.tags);
      // store new file in mapping
      resources[msg.sender][lastIds[msg.sender]] = myFile;
      // emit event, also need for drizzle
      // emit fileAdded(lastIds[msg.sender],ipfshash,_filename);
      if(lastIds[msg.sender] >= maxAmountOfFiles) lastIds[msg.sender] = 0;
      else lastIds[msg.sender]++;
   }
   
   function getFileTags(address owner, uint256 _index) external view returns (bytes32[5] memory) {
       return resources[owner][_index].tags;
   }

}
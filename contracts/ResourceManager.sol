// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

// imported contract 
import "@openzeppelin/contracts/access/Ownable.sol";
import './Resource.sol';



contract ResourceManager is Ownable{

    enum ResourceStatus{AVAILABLE, UPDATED,DELETED}


    uint itemIndex;
    mapping (string => S_Resource) public items;

    struct S_Resource{
        Resource _resource;
        ResourceManager.ResourceStatus status;
    }

    // Modifiers
    modifier isAvailable (string memory _id){ require(items[_id].status == ResourceManager.ResourceStatus.AVAILABLE, "Resource is not available"); _;}
    

    function createResource(string memory _ipfsHash, Resource.License _license) external onlyOwner{
        Resource resource = new Resource(this, _ipfsHash, _license);
        items[_ipfsHash]._resource = resource;
        items[_ipfsHash].status = ResourceManager.ResourceStatus.AVAILABLE;

    }

    function updateResource(uint _itemIndex, string memory _ipfsHash) external  onlyOwner{
        // TODO: Use adaptation or create a new version
    }

    function deleteResource(string memory _id) external onlyOwner{
        items[_id].status = ResourceManager.ResourceStatus.DELETED;
    }


}
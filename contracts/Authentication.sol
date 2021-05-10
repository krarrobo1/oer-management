// SPDX-License-Identifier: MIT
pragma solidity >=0.4.16 <0.9.0;

contract Authentication {
    struct User {
        bytes32 name;
        uint256 createdAt;
    }

    mapping(address => User) private users;

    address[] public registered;

    event UserCreated(
        address indexed _address,
        bytes32 _name,
        uint256 _created_at
    );
    event UserUpdated(
        address indexed _address, 
        bytes32 _name
    );

    event UserDeleted(
        address indexed _address
    );

    // Check if user exists or terminate
    modifier onlyExistingUser {
        require(!(users[msg.sender].name == 0x0), "Only existing users");
        _;
    }

    modifier onlyValidName(bytes32 name) {
        // Only valid names allowed
        require(!(name == 0x0), "Only valid names");
        _;
    }

    function login() public view onlyExistingUser returns (bytes32) {
        return (users[msg.sender].name);
    }

    function signUp(bytes32 name)
        public
        payable
        onlyValidName(name)
        returns (bytes32)
    {
        if (users[msg.sender].name == 0x0) {
            users[msg.sender].name = name;
            users[msg.sender].createdAt = block.timestamp;

            registered.push(msg.sender);
            emit UserCreated(msg.sender, name, block.timestamp);
            return (users[msg.sender].name);
        }

        return (users[msg.sender].name);
    }

    function update(bytes32 name)
        public
        payable
        onlyValidName(name)
        onlyExistingUser
        returns (bytes32)
    {
        // Update user name.
        if (users[msg.sender].name != 0x0) {
            users[msg.sender].name = name;
            emit UserUpdated(msg.sender, name);
        }
        return (users[msg.sender].name);
    }

    function getRegisteredCount() public view returns(uint usersCount){
        return registered.length;
    }
}

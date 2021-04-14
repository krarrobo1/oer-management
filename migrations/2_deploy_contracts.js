var ResourceManager = artifacts.require("./ResourceManager.sol");

module.exports = function(deployer) {
  deployer.deploy(ResourceManager);
};

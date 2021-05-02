let ResourceList = artifacts.require('./ResourceList');
let ResourceTracker = artifacts.require('./ResourceTracker');
let Greeter = artifacts.require('./Greeter');

module.exports = function(deployer) {
  deployer.deploy(ResourceList);
  deployer.deploy(ResourceTracker);
  deployer.deploy(Greeter);
};

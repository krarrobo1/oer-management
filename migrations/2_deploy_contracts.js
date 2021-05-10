let ResourceList = artifacts.require('./ResourceList');
let ResourceTracker = artifacts.require('./ResourceTracker');
let Greeter = artifacts.require('./Greeter');
let Authentication = artifacts.require('./Authentication');

module.exports = function(deployer) {
  deployer.deploy(ResourceList);
  deployer.deploy(ResourceTracker);
  deployer.deploy(Greeter);
  deployer.deploy(Authentication);
};

import ResourceList from './contracts/ResourceList.json';
import ResourceTracker from './contracts/ResourceTracker.json';
import Authentication from './contracts/Authentication.json';


const options = {
  contracts: [ResourceList, Authentication],
  events: {
    Authentication: ['UserCreated', 'UserUpdated', 'UserDeleted'],
    ResourceList: ['fileAdded']
  }
};

export default options;
import React, { Component } from "react";
import ResourceManagerContract from "./contracts/ResourceManager.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import ipfs from "./ipfs";

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      ipfsHash: null
    }
    
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = ResourceManagerContract.networks[networkId];

      const instance = new web3.eth.Contract(
        ResourceManagerContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  captureFile = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  }

  convertToBuffer = async(reader) =>{
    const buffer = await Buffer.from(reader.result);
    this.setState({ buffer });
  }

  onIPFSSubmit = async (event) =>{
    event.preventDefault();
    await ipfs.add(this.state.buffer, (err, ipfsHash) =>{
      console.log('IPFS_ERROR: ', {err});
      console.log({ ipfsHash });
      this.setState({ ipfsHash: ipfsHash[0].hash });
    });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Upload your OER here</h1>
          <form id="ipfs-hash-form" className="scep-form" onSubmit={this.onIPFSSubmit}> 
              <input type="file" onChange={this.captureFile}/>
              <button type="submit">
                Send it
              </button>
          </form>
          <p>The IPFS hash is: {this.state.ipfsHash}</p>
      </div>
    );
  }
}

export default App;

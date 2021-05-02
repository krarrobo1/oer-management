import React, { Component } from "react";
// import FileListContract from "./contracts/FileList.json";
// import getWeb3 from "./getWeb3";
import "./App.css";
import { AppRouter } from "./components/nav/AppRouter";
// import ipfs from "./ipfs";
// import { UploadForm } from "./components/UploadForm";

class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.state = {
  //     loaded: false,
  //     ipfsHash: null,
  //     buffer:'',
  //     ethAddress:'',
  //     transactionHash:'',
  //     txReceipt: '',
  //     imageUploading: false,
  //     txMSG: 'No Files Uploaded Yet',
  //     tags: '',
  //     filename: '',
  //     formErrors: {fileName: '', tags: ''},
  //     fileNameValid: false,
  //     tagsValid: false,
  //     formValid: false,
  //     canSubmit: false
  //   }

  // }

  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     this.web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     this.accounts = await this.web3.eth.getAccounts();

  //     // Get the contract instance.
  //     this.networkId = await this.web3.eth.net.getId();

  //     this.deployedNetwork = FileListContract.networks[this.networkId];

  //     this.fileListContract = new this.web3.eth.Contract(
  //       FileListContract.abi,
  //       this.deployedNetwork && this.deployedNetwork.address,
  //     );

  //     this.setState({ loaded: true });
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };

  // captureFile = (event) => {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   const file = event.target.files[0];
  //   let reader = new window.FileReader();
  //   reader.readAsArrayBuffer(file);
  //   reader.onloadend = () => this.convertToBuffer(reader);
  // }

  // convertToBuffer = async (reader) => {
  //   const buffer = await Buffer.from(reader.result);
  //   this.setState({ buffer });
  // }

  // onIPFSSubmit = async (event) => {
  //   event.preventDefault();

  //   const inputtedTags = this.state.tags.split(',')
  //   const ipfsFileName = this.web3.utils.utf8ToHex(this.state.filename);

  //   await ipfs.add(this.state.buffer, async(err, ipfsHash) => {
  //     console.log(err);
  //     console.log(ipfsHash);

  //     this.setState({ ipfsHash: ipfsHash[0].hash });
  //     let ipfsTags = ["0x00", "0x00", "0x00", "0x00", "0x00"]
  //     for (var i = 0; i < inputtedTags.length; i++)
  //       ipfsTags[i] = this.web3.utils.utf8ToHex(inputtedTags[i]);

  //     let result = await this.fileListContract.methods.addFile(this.state.ipfsHash, ipfsFileName, ipfsTags).send({
  //       from: this.accounts[0]
  //     });
  //     console.log(result);
  //   });
  // }

  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value}, 
  //       () => { this.validateField(name, value) });
  // }

  // validateField(fieldName, value) {
  //   let fieldValidationErrors = this.state.formErrors;
  //   let fileNameValid = this.state.fileNameValid;
  //   let tagsValid = this.state.tagsValid;

  //   switch (fieldName) {
  //     case 'filename':
  //       fileNameValid = value.length >= 2;
  //       fieldValidationErrors.fileName = fileNameValid ? '' : ' is invalid';
  //       break;
  //     case 'tags':
  //       tagsValid = value.length >= 5;
  //       fieldValidationErrors.tags = tagsValid ? '' : ' is invalid';
  //       break;
  //     default:
  //       break;
  //   }
  //   this.setState({
  //     formErrors: fieldValidationErrors,
  //     fileNameValid: fileNameValid,
  //     tagsValid: tagsValid
  //   }, this.validateForm);
  // }


  // render() {
  //   if (!this.state.loaded) {
  //     return <div>Loading Web3, accounts, and contract...</div>;
  //   }
  //   return (
  //     <div className="App">
  //       <h1>Upload your OER here</h1>
  //       <form id="ipfs-hash-form" className="scep-form" onSubmit={this.onIPFSSubmit}>
  //         <div>
  //           <label className="label">Filename</label>
  //           <input type="text" placeholder="Enter name of the file" name="filename" onChange={this.handleChange} />
  //         </div>

  //         <div>
  //           <label className="label">Tags (Enter comma seperated string)</label>
  //           <input type="text" placeholder="Enter List of Tags" name="tags" onChange={this.handleChange}/>
  //         </div>

  //         <input type="file" onChange={this.captureFile} />
  //         <button type="submit">Send it</button>
  //       </form>
  //       <p>The IPFS hash is: {this.state.ipfsHash}</p>
  //     </div>
  //   );
  // }
  render() {
    return (
      <>
        <AppRouter/>
      </>
    )
  }
}
export default App;
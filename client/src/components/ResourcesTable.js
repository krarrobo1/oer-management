import React, { useEffect, useState } from 'react';
import { timeConverter } from '../helpers/timeConverter';
import { IPFSURL } from '../util/constants';

export const ResourcesTable = (props) => {
    const { drizzle, drizzleState } = props;

    const [fileArray, setFileArray] = useState([]);

    useEffect(() => {
        async function fetchResources() {
            let table = [];
            let lastIds = await drizzle.contracts.ResourceList.methods.lastIds(drizzleState.accounts[0]).call();
            for (let i = 0; i < lastIds; i++) {
                let resource = await drizzle.contracts.ResourceList.methods.resources(drizzleState.accounts[0], i).call();
                resource.filename = drizzle.web3.utils.hexToUtf8(resource.filename);
                resource.timestamp = timeConverter(resource.timestamp);
                resource.subject = drizzle.web3.utils.hexToUtf8(resource.subject);
                resource.materialType = drizzle.web3.utils.hexToUtf8(resource.materialType);
                resource.license = 'CCBY0';
                resource.language = drizzle.web3.utils.hexToUtf8(resource.language);
                resource.ipfshash = drizzle.web3.utils.hexToUtf8(resource.ipfshash);

                let tagsTemp = await drizzle.contracts.ResourceList.methods.getFileTags(drizzleState.accounts[0], i).call()
                for (let j = 0; j < 5; j++) {
                    if (tagsTemp[j] !== '0x0000000000000000000000000000000000000000000000000000000000000000') {
                        tagsTemp[j] = drizzle.web3.utils.hexToUtf8(tagsTemp[j])
                    } else {
                        tagsTemp[j] = "N/A";
                    }
                }
                resource.tags = tagsTemp;
                table.push(resource);
            }
            return table;
        }
        fetchResources().then(table =>{
            setFileArray(table);
        })
    }, []);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ResourceName</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Material Type</th>
                    <th scope="col">Owner Address</th>
                    <th scope="col">Ipfs Hash</th>
                    <th scope="col">Timestamp</th>
                    <th scope="col">Tags</th>
                    <th scope="col">Language</th>
                    <th scope="col">License</th>
                </tr>
            </thead>
            <tbody>
                {fileArray !== undefined &&
                    fileArray.map(ipfsRow =>
                        <tr key={ipfsRow.id}>
                            <td key={ipfsRow.filename}>{ipfsRow.filename}</td>
                            <td key={ipfsRow.subject}>{ipfsRow.subject}</td>
                            <td key={ipfsRow.materialType}>{ipfsRow.materialType}</td>
                            <td key={ipfsRow.owner}>{ipfsRow.owner}</td>
                            <td key={ipfsRow.ipfshash}><a href={IPFSURL + ipfsRow.ipfshash} target='_blank'>
                                View File </a>
                            </td>
                            <td key={ipfsRow.timestamp}>{ipfsRow.timestamp}</td>
                            {/** Return inputted Tags */
                                (ipfsRow.tags !== undefined && ipfsRow.tags.length > 3) &&
                                <td>
                                    <div className='tags'>
                                        <span className='badge bg-primary'>{ipfsRow.tags[0]}</span>
                                        <span className='badge bg-primary'>{ipfsRow.tags[1]}</span>
                                        <span className='badge bg-primary'>{ipfsRow.tags[2]}</span>
                                        <span className='badge bg-primary'>{ipfsRow.tags[3]}</span>
                                        <span className='badge bg-primary'>{ipfsRow.tags[4]}</span>
                                    </div>
                                </td>
                            }
                            <td key={ipfsRow.language}>{ipfsRow.language}</td>
                            <td key={ipfsRow.license}>{ipfsRow.license}</td>
                        </tr>
                    )}
            </tbody>
        </table>
    );
}

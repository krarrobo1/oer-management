import React from 'react'
import { UploadForm } from '../UploadForm';
import { AccountData } from '@drizzle/react-components';
import { ResourcesTable } from '../ResourcesTable';




export const HomeScreen = ( props ) => {


    const { drizzle, drizzleState } = props;

    return (
        <div className="container mt-5">

            {/* <h4>ETH Address: <small>{ drizzleState.accounts[0] }</small></h4> */}
            <h1>Upload</h1>
            <hr />

            <UploadForm {...props} />

            <h1 className="mt-5">Your OERs</h1>
            <hr />

            <ResourcesTable {...props} />
        </div>
    )
}

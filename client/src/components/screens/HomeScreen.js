import React from 'react'
import { UploadForm } from '../UploadForm';
import { AccountData } from '@drizzle/react-components';




export const HomeScreen = ( props ) => {


    const { drizzleState } = props;

    return (
        <div className="container mt-5">
            <h3>Welcome, { drizzleState.accounts[0] }</h3>
            <h1>Upload</h1>
            <hr />

            <UploadForm {...props} />
        </div>
    )
}

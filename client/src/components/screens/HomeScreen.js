import React, { useState, useEffect  } from 'react';
import { UploadForm } from '../UploadForm';
import { RegisterForm } from '../RegisterForm';
import { ResourcesTable } from '../ResourcesTable';

export const HomeScreen = (props) => {

    const { drizzle, drizzleState } = props;

    const [isLogged, setIsLogged] = useState(false);
    const [account, setAccount] = useState(false);
    // Talvez hay que usar directo el state y cachear los get de cada contract ?
    useEffect(() => {
        console.log("handling login")
        const handleLogin = async () => {
            try {
                return await drizzle.contracts.Authentication.methods.login.call({ from: drizzleState.accounts[0] });
            } catch (error) {
                console.log(
                    'LOGIN_ERROR',
                    { error }
                )
            }
        }
       handleLogin().then((result) =>{
           console.log(result)
           if(result){
               setIsLogged(true)
           }
       }).catch(console.log)
       
    }, [])

    return (
        <div className="container mt-5">

            {/* <h4>ETH Address: <small>{ drizzleState.accounts[0] }</small></h4> */}
            {
                !isLogged ?
                    <RegisterForm {...props} />
                    :
                    <div>
                        Welcome!! {drizzleState.accounts[0]}
                    </div>
            }

            <h1>Upload</h1>
            <hr />

            <UploadForm {...props} isLogged />

            <h1 className="mt-5">Your OERs</h1>
            <hr />
            <ResourcesTable {...props} account={drizzleState.accounts[0]} />
        </div>
    )
}

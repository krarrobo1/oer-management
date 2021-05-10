import React from 'react';
import './style.css';

export const LoginScreen = (props) => {
    const { drizzle, drizzleState } = props;


    const handleLogin = async () => {
        try {
            const result = await drizzle.contracts.Authentication.methods.login().call({ from: drizzleState.accounts[0] });
            let name = drizzle.web3.utils.hexToUtf8(result);
            alert("Welcome " + name)
        } catch (error) {
            console.log(
                'LOGIN_ERROR',
                { error }
            )
        }
    }

    return (
        <>
            <h3>OER World</h3>
            <p>Click the button bellow to start</p>
            <button
                className="btn btn-success btn-block"
                onClick={handleLogin}
            >Login</button>
        </>
    )
}

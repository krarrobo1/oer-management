import React from 'react';
import { useForm } from '../hooks/useForm';


export const RegisterForm = (props) => {
    const { drizzle, drizzleState } = props;

    const [formState, handleInputChange] = useForm({
        name: ''
    });

    const { name } = formState;

    const handleRegister = async(e) => {
        e.preventDefault();
        if (isFormValid()) {
            await registerUser();
        }
    }

    const registerUser = async() => {
        const userAddress = drizzleState.accounts[0];
        const hexName = drizzle.web3.utils.utf8ToHex(name);
        try {
            await drizzle.contracts.Authentication.methods.signUp(hexName).send({ from: userAddress });
            alert("User registered");
            // TODO: Dispatch User registered.
        } catch (error) {
            console.log('REGISTER_ERR', error);            
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            return false;
        }
        return true;
    }
    return (
        <form onSubmit={handleRegister}>
            <h3>Register</h3>
            <div className="form-group">
                <label>Enter your name</label>
                <input
                    type="text"
                    placeholder="Your name"
                    autoComplete="off"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    maxLength="32"
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>
    )
}

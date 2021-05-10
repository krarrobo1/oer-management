import React from 'react';
import { 
    Switch, 
    Route,
    Redirect
} from 'react-router';
import { LoginScreen } from '../components/screens/LoginScreen';
import { RegisterScreen } from '../components/screens/RegisterScreen';
import '../App.css';

// TODO: Hacer publica Explore..
export const AuthRouter = () => {
    return (
        <div className="wrapper">
            <div className="box-container">
                <Switch>
                    <Route path="/auth/login" component={ LoginScreen } />
                    <Route exact path="/auth/register" component={ RegisterScreen } />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </div>
    )
}

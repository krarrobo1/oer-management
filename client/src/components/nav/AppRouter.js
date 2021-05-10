import React , { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom';

import { NavBar } from './NavBar';

import { AboutScreen } from '../screens/AboutScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterForm } from '../RegisterForm';
import { RepositoriesScreen } from '../screens/RepositoriesScreen';
import { TrackerScreen } from '../screens/TrackerScreen';

export const AppRouter = (props) => {
   
    return (
        <Router>
            <div>
                
                <NavBar />

                <div className="container">
                    <Switch>
                        <Route exact path="/" component={ () => <HomeScreen {...props} /> } />

                        <Route exact path="/about" component={ AboutScreen } />

                        <Route exact path="/explorer" component={ () => <RepositoriesScreen {...props} /> }  />
                        <Route exact path="/tracker" component={ (props) => <TrackerScreen {...props} /> }  />
                        
                        <Redirect to="/" />

                    </Switch>
                </div>
            </div>
        </Router>
    )
}
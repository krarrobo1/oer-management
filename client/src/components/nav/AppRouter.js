import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from 'react-router-dom';

import { NavBar } from './NavBar';

import { AboutScreen } from '../screens/AboutScreen';
import { HomeScreen } from '../screens/HomeScreen';

export const AppRouter = (props) => {
    return (
        <Router>
            <div>
                
                <NavBar />

                <div className="container">
                    <Switch>
                        <Route exact path="/" component={ () => <HomeScreen {...props} /> } />

                        <Route exact path="/about" component={ AboutScreen } />
                        
                        <Redirect to="/" />

                    </Switch>
                </div>
            </div>
        </Router>
    )
}
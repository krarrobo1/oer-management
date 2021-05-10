import React from 'react';
// import { Component } from 'react';
import { Redirect, Route } from 'react-router';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest 
 }) =>{
     return (
         <Route
         {...rest}
         component={ (props) => (
             (isAuthenticated)
             ? (<Redirect to="/"/>)
             :(<Component {...props} />)
         )}
         />
     )
 };
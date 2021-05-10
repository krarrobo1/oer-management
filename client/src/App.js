import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle, generateStore } from "@drizzle/store";
import { combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { uiReducer } from './reducers/uiReducer';

import drizzleOptions from "./drizzleOptions";
import "./App.css";
// import { AppRouter } from './components/nav/AppRouter';
import { AppRouter } from './components/nav/AppRouter';

// const store = generateStore({
//   reducers: combineReducers({
//     auth: authReducer,
//     ui: uiReducer,
//   })
// });

const drizzle = new Drizzle(drizzleOptions);



const App = () => {
 
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

          return (
            <AppRouter drizzle={drizzle} drizzleState={drizzleState} />
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
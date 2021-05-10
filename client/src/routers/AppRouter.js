import React from 'react'
import { Router, Switch } from 'react-router';
import { ExplorerScreen } from '../components/screens/ExplorerScreen';
import { HomeScreen } from '../components/screens/HomeScreen';
import { UploadForm } from '../components/UploadForm';
import { AuthRouter } from './AuthRouter';

import { useSelector } from 'react-redux';


export const AppRouter = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { address } = useSelector(state => state.auth);


    useEffect(() => {
        if (!!address) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [address]);

    return (
        <Router>
            <div className="container">
                <Switch>
                    <PublicRoute
                        path="/auth"
                        isAuthenticated={isLoggedIn}
                        component={AuthRouter}
                        {...props} />

                    {/* <PublicRoute
                        path="/explore"
                        isAuthenticated={isLoggedIn}
                        component={ExplorerScreen} /> */}

                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component={HomeScreen}
                        {...props}
                    />

                    <Redirect
                        to="/" />
                </Switch>
            </div>
        </Router>
    )
}

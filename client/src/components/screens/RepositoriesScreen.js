import React, { useState } from 'react';
import { ResourcesTable } from '../ResourcesTable';
import useConstructor from '../../hooks/useConstructor';
import './style.css';

export const RepositoriesScreen = (props) => {
    const { drizzle, drizzleState } = props;

    const [registered, setRegistered] = useState([]);

    const [selected, setSelected] = useState(null);

    // TODO: Get registered
    useConstructor(() => {
        async function fetchUsers() {
            let userList = [];
            let size = await drizzle.contracts.Authentication.methods.getRegisteredCount().call();
            for (let i = 0; i < size; i++) {
                let user = await drizzle.contracts.Authentication.methods.registered(i).call();
                userList.push(user);
            }
            return userList;
        }
        fetchUsers().then(userList => {
            console.log(userList);
            setRegistered(userList);
        })
    });

    const showRepo = (user) =>{
        setSelected(user);
    }




    return (
        <div className="mt-5">
            <h1>Repositories</h1>
            <hr />
            <div>
                <ul>
                {
                    registered.map((user) =>
                        (<li 
                        className="user-li"
                        key={user}
                        onClick={()=> showRepo(user)}
                        >
                            {user}
                        </li>)
                    )
                }
                </ul>
            </div>
            <h1 className="mt-5">{selected} OERs</h1>
            <hr />
            {
                !!selected ? 
                <ResourcesTable {...props} account={selected} />
                :
                <div class="alert alert-primary" role="alert">
                    Select an account
                </div>
            }
            
        </div>
    )
}

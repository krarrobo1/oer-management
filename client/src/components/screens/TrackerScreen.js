import React  from 'react';
import useConstructor from '../../hooks/useConstructor';
import ResourceTracker from '../../contracts/ResourceTracker.json';

export const TrackerScreen = (props) => {
    const { drizzle, drizzleState, resource } = props.location;
    useConstructor(() => {
        const tracker = drizzle.contracts[resource.tracker];
        const initContract = () => {
            const contractInterface = ResourceTracker.abi;
            const account = drizzleState.accounts[0];
            const contractConfig = {
                contractName: resource.tracker,
                web3Contract: new drizzle.web3.eth.Contract(contractInterface, resource.tracker, {
                    from: account,
                    gasPrice: '20000000000'
                })
            };
            drizzle.addContract(contractConfig);
        }
        if(!tracker){
            initContract();
        }
    })



    // useEffect(
    //     () => {
    //         console.log("Salud2");
    //         return () => {
    //             console.log("Me fui!");
    //             drizzle.deleteContract(resource.tracker);
    //         }
    //     }, []);

    return (
        <div className="mt-5">
            <h1>Explorer</h1>
            <hr />
            <div>
                {/* <button
                    className="btn btn-sucess"
                    onClick={attachContract}
                >Attach Contract</button> */}
                <pre>{JSON.stringify(resource, null, 3)}</pre>
            </div>
        </div>
    )
}

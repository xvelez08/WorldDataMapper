import React, {useState}            from 'react';
import Homescreen       from './components/homescreen/Homescreen';
import RegionHomescreen  from './components/homescreen/RegionHomescreen';
import { useQuery }     from '@apollo/client';
import * as queries     from './cache/queries';
import {jsTPS}          from './utils/jsTPS'; 
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
    let user = null;
    let transactionStack = new jsTPS(); 
    let refreshTps = false; //Flag to reset transaction stack 
    const [activeMap, setActiveMap]         = useState({});
    let userAppName = "";
    
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);
    
    if(error){ console.log(error); }
    if(loading) {console.log(loading); }
    if(data){ 
        let { getCurrentUser } = data;
        if(getCurrentUser !== null) {
            user = getCurrentUser;
            userAppName = user.fullName;
        }    
    }
    return(
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to={{pathname: "/home"}} />
                <Route 
                    path="/region"
                    name="maps"
                    render={()=>
                        
                        <RegionHomescreen fetchUser={refetch} user={user} userName={userAppName}
                                        activeMap={activeMap} setActiveMap={setActiveMap}
                                    tps = {transactionStack} refreshTps = {refreshTps}
                        /> // TODO: Add tps here also also find out about 2nd route
                        
                    }
                    >
                    
                </Route>
                
                <Route 
                    path = "/home"
                    name = "home"
                    render={()=>
                        <Homescreen fetchUser={refetch} user={user} userName={userAppName}
                                    tps = {transactionStack} refreshTps = {refreshTps}
                                    setActiveMap={setActiveMap} activeMap={activeMap}
                        /> // TODO: Add tps here also also find out about 2nd route
                        
                    }
                />
                <Route/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
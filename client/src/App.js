import React            from 'react';
import Homescreen       from './components/homescreen/Homescreen';
import { useQuery }     from '@apollo/client';
import * as queries     from './cache/queries';
import {jsTPS}          from './utils/jsTPS'; 
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
    let user = null;
    let transactionStack = new jsTPS(); 
    let refreshTps = false; //Flag to reset transaction stack 
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);
    
    if(error){ console.log(error); }
    if(loading) {console.log(loading); }
    if(data){ 
        let { getCurrentUser } = data;
        if(getCurrentUser !== null) {
            user = getCurrentUser; 
        }    
    }
    return(
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to={{pathname: "/home"}} />
                <Route 
                    path = "/home"
                    name = "home"
                    render={()=>
                        <Homescreen fetchUser={refetch} user={user} 
                                    tps = {transactionStack} refreshTps = {refreshTps}
                        /> // TODO: Add tps here also also find out about 2nd route
                        
                    }
                />
                <Route/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
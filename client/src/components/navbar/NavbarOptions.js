import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';


const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            // if (reset) props.setActiveList({});
        }
    };

    return (
        <>
        <WNavItem hoverAnimation="lighten">
                <WButton clickAnimation="ripple-light" shape="pill" id="editAccount" className="navbar-options" onClick={props.setShowEdit} wType="texted" hoverAnimation="text-primary">
                    {props.userName}  
                </WButton>
        </WNavItem>
        
        <WNavItem hoverAnimation="lighten">
            <WButton clickAnimation="ripple-light" shape = "pill" id="logoutButton" className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                Logout
            </WButton>
        </WNavItem >

        </>
    );
};

const LoggedOut = (props) => {
    return (
        <>
            <WNavItem hoverAnimation="lighten">
                <WButton clickAnimation="ripple-light" shape="pill" id="createAccount" className="navbar-options" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary">
                    Create Account
                </WButton>
            </WNavItem>
            <WNavItem hoverAnimation="lighten">
                <WButton clickAnimation="ripple-light" id="loginButton" shape="pill" className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary"> 
                    Login
                </WButton>
            </WNavItem>
        </>
    );
};


const NavbarOptions = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate}  />
                : <LoggedIn userName={props.userName} fetchUser={props.fetchUser} setShowEdit={props.setShowEdit} logout={props.logout} />
            }
        </>

    );
};

export default NavbarOptions;
import React, {useCallback} from 'react';
import { WButton, WNavItem }                from 'wt-frontend';
import {useHistory}                         from 'react-router-dom';

const Logo = (props) => {

    const history = useHistory(); 
    const handleOnClick = useCallback(() => history.push('/home'), [history]);
    return (
        <>
        <WNavItem id="logo" hoverAnimation="lighten">
                <WButton clickAnimation="ripple-light" shape="rounded" id="logoButton"  className="navbar-options logo" onClick={handleOnClick} wType="texted" hoverAnimation="text-primary">
                The World<br/>Data Mapper
                </WButton>
        </WNavItem>
        </>
    );
};

export default Logo;
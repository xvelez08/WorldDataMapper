import React from 'react';
import { WButton, WNavItem }                from 'wt-frontend';

const Logo = (props) => {
    return (
        <>
        <WNavItem id="logo" hoverAnimation="lighten">
                <WButton clickAnimation="ripple-light" shape="rounded" id="logoButton"  className="navbar-options logo" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary">
                The World<br/>Data Mapper
                </WButton>
        </WNavItem>
        </>
    );
};

export default Logo;
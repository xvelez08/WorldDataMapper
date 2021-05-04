import React                            from 'react';
import {WCard, WCFooter,WCContent}      from 'wt-frontend';
import { FaGlobeAmericas } from 'react-icons/fa';
const MainContents = (props) => {
    return (
        <>
      <WCard wLayout="content"  className="welcome-content-card">
        <WCContent>
            <div class="icon-container">
            <i class="fas fa-globe-americas fa-10x"></i>
            <h1 id="welcome-msg">Welcome to the World Data Mapper</h1>
            </div>
        </WCContent>
      </WCard>
        </>
    );
};

export default MainContents;
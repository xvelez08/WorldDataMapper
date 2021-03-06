import React                            from 'react';
import {WCard, WCFooter,WCContent, WCMedia, WCHeader, WButton}      from 'wt-frontend';
import { FaGlobeAmericas }              from 'react-icons/fa';
import RegionTableHeader                   from './RegionTableHeader';
import RegionTableContents from '../mapscreen/RegionTableContents';
const RegionMainContents = (props) => {
    const authRegion = props.displayMap === null ? false : true; 
    
    return (
       <>
        
    {
        props.auth ?
            
            <>
            <div className = "region-table">
            <RegionTableHeader
                disabled={!props.user._id}        addMap={props.addMap}
                setShowDelete={props.setShowDelete} sort={props.sort}
                createNewMap={props.createNewMap}     
            />
           
            <RegionTableContents
                key={props.user._id}      user={props.user} setShowDelete={props.setShowDelete}
                deleteRegion={props.deleteRegion}  editItem={props.editItem}    regions={props.regions}
                activeMap={props.activeMap} editRegion={props.editRegion} 
            />
                </div>
                </>
            
				:
        
        <WCard wLayout="content"  className="welcome-content-card">
            <WCContent>
                <div className="icon-container">
                <i className="fas fa-globe-americas fa-10x"></i>
                <h1 id="welcome-msg">Welcome to the World Data Mapper</h1>
                </div>
            </WCContent>
        </WCard>
    }

        </>
    );
};

export default RegionMainContents;
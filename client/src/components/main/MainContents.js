import React                            from 'react';
import {WCard, WCFooter,WCContent, WCMedia, WCHeader}      from 'wt-frontend';
import { FaGlobeAmericas }              from 'react-icons/fa';
import MapTableHeader                      from './MapTableHeader';
import MapTableContents                    from './MapTableContents';
import RegionTableHeader from '../mapscreen/RegionTableHeader';
import RegionTableContents from '../mapscreen/RegionTableContents';
const MainContents = (props) => {
    const authRegion = props.displayMap === null ? false : true; 
    
    return (
       <>
        
    {
        props.auth ?
            
            <div className = "map-table">
            <MapTableHeader
                disabled={!props.user._id}        addMap={props.addMap}
                setShowDelete={props.setShowDelete} 
                createNewMap={props.createNewMap}     
            />
           
            <MapTableContents
                key={props.user._id}      user={props.user} setShowDelete={props.setShowDelete}
                deleteItem={props.deleteItem}  editItem={props.editItem}    handleMapClick={props.handleMapClick}
                mapList={props.mapList} updateMapField={props.updateMapField}
            />
                </div>
            
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

export default MainContents;
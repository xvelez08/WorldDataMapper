import React                            from 'react';
import {WCard, WCFooter,WCContent, WCMedia, WCHeader}      from 'wt-frontend';
import { FaGlobeAmericas }              from 'react-icons/fa';
import MapTableHeader                      from './MapTableHeader';
import MapTableContents                    from './MapTableContents';
const MainContents = (props) => {
    return (
        <>
        
    {
        props.auth ?
                
            <div class = "map-table">
            <MapTableHeader
                disabled={!props.user._id}        addMap={props.addMap}
                setShowDelete={props.setShowDelete} setActiveMapList={props.setActiveMapList}
                createNewMap={props.createNewMap}     
            />
           
            <MapTableContents
                key={props.user._id}      user={props.user} setShowDelete={props.setShowDelete}
                deleteItem={props.deleteItem}  editItem={props.editItem}
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
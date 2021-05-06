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
                
            <WCard wLayout="header-content-media" className="map-table-card">
							<div className='table ' >
            <WCHeader className="map-table-header">
            <MapTableHeader
                disabled={!props.user._id}        addMap={props.addMap}
                setShowDelete={props.setShowDelete} setActiveMapList={props.setActiveMapList}     
            />
            </WCHeader>
            <WCContent className="map-table-content">
            <MapTableContents
                key={props.user._id}      user={props.user}
                deleteItem={props.deleteItem}  editItem={props.editItem}        
            />
        
            </WCContent>
            <WCMedia className="map-table-media">
            <i class="fas fa-globe-americas fa-10x globe2"></i>

            </WCMedia>
                </div>
            </WCard>
				:
        <WCard wLayout="content"  className="welcome-content-card">
            <WCContent>
                <div class="icon-container">
                <i class="fas fa-globe-americas fa-10x"></i>
                <h1 id="welcome-msg">Welcome to the World Data Mapper</h1>
                </div>
            </WCContent>
        </WCard>
    }

        </>
    );
};

export default MainContents;
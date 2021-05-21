import React        from 'react';
import MapTableEntry   from './MapTableEntry';

const MapTableContents = (props) => {

    const entries = props.mapList ? props.mapList : null;
    // let entryCount = 0;
    // if(entries) {
    //     entries = entries.filter(entry => entry !== null);
    //     entryCount = entries.length;
    //     console.log(entryCount);
    // } 
    
    return (
       entries ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <MapTableEntry
                        data={entry} key={entry._id} index={index}  setShowDelete={props.setShowDelete}
                        deleteItem={props.deleteItem} updateMapField ={props.updateMapField}
                        handleMapClick={props.handleMapClick}
                    />
                ))
            }
            
            </div>
            : <div className='container-primary' >
                {/* {
                    props.activeMapList._id ? <h2 className="nothing-msg"> Create A Map!</h2> : <></> 
                }                */}
                
            </div>
    );
};

export default MapTableContents;
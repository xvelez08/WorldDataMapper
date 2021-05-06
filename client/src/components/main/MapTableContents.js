import React        from 'react';
import MapTableEntry   from './MapTableEntry';

const MapTableContents = (props) => {

    let entries = props.activeMapList ? props.activeMapList : undefined;
    let entryCount = 0;
    if(entries) {
        entries = entries.filter(entry => entry !== null);
        entryCount = entries.length;
        console.log(entryCount);
    } 
    
    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <MapTableEntry
                        data={entry} key={entry._id} index={index} entryCount={entryCount}
                        deleteItem={props.deleteItem} editItem={props.editItem}
                    />
                ))
            }

            </div>
            : <div className='container-primary' >
                {
                    props.key ? <h2 className="nothing-msg"> Create A Map!</h2> : <></> 
                }               
                
            </div>
    );
};

export default MapTableContents;
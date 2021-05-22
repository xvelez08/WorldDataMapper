import React        from 'react';
import RegionTableEntry   from './RegionTableEntry';

const RegionTableContents = (props) => {

    let entries = props.activeMap ? props.regions : null;
    let entryCount = 0;
    console.log(entryCount);
    if(entries) {
        entries = entries.filter(entry => entry !== null);
        entryCount = entries.length
    } 
    
    return (
        entries !== null && entries.length > 0 ? <div className=' region-table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <RegionTableEntry
                        data={entry} key={entry._id} index={index} entryCount={entryCount}
                        deleteRegion={props.deleteRegion} reorderItem={props.reorderItem}
                        editRegion={props.editRegion} 
                    />
                ))
            }

            </div>
            : <div className='container-primary' >
                {
                     <h2 className="nothing-msg"> Nothing to show!</h2> 
                }               
                
            </div>
    );
};

export default RegionTableContents;
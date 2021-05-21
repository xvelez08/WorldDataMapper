import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const MapTableEntry = (props) => {
    const { data } = props;
    const name = data.name; 
    const mapid = data._id; 
    const [editingName, toggleNameEdit] = useState(false);

    const disabledButton = () => {}

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = name;
        if(newName !== prevName) {
            props.updateMapField(data._id, 'name', newName, prevName);
        }

    };

    // const handleDescrEdit = (e) => {
    //     toggleDescrEdit(false);
    //     const newDescr = e.target.value ? e.target.value : 'No Description';
    //     const prevDescr = description;
    //     if(newDescr !== prevDescr) {
    //         props.editItem(data._id, 'description', newDescr, prevDescr);
    //     }
    // };

    // const handleStatusEdit = (e) => {
    //     toggleStatusEdit(false);
    //     const newStatus = e.target.value ? e.target.value : false;
    //     const prevStatus = status;
    //     if(newStatus !== prevStatus) {
    //         props.editItem(data._id, 'completed', newStatus, prevStatus);
    //     }
    // };

    // const handleAssignEdit = (e) => {
    //     toggleAssignEdit(false);
    //     const newAssigned = e.target.value ? e.target.value : 'Myself';
    //     const prevAssigned = assigned_to;
    //     if(newAssigned !== prevAssigned) {
    //         props.editItem(data._id, 'assigned_to', newAssigned, prevAssigned);
    //     }
    // }
    

    return (
        <WRow className='table-entry'>
            <WCol size="10">
                {
                    editingName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleNameEdit(e)}}
                            autoFocus={true} defaultValue={name} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text" onClick={()=>props.handleMapClick(mapid)}
                        >{name}
                        </div>
                }
            </WCol>

            <WCol size="1" className="table-entry-col">
                {

                    <WButton title="Edit Name" color="colored" shape="rounded" hoverAnimation= "lighten"
                                onClick={() => toggleNameEdit(!editingName)}
                    >
                            <i className="material-icons entry-button">edit</i>
                    </WButton>
                    // editingDate ? <WInput
                    //     className='table-input' onBlur={handleDateEdit}
                    //     autoFocus={true} defaultValue={due_date} type='date'
                    //     wtype="outlined" baranimation="solid" inputclass="table-input-class"
                    // />
                    //     : <div className="table-text"
                    //         onClick={() => toggleDateEdit(!editingDate)}
                    //     >{due_date}
                    //     </div>
                }
            </WCol>
            <WCol size="1" className="table-entry-col">
                    <WButton title="Delete Map"  color="colored" shape="rounded" hoverAnimation= "lighten"
                                onClick={() => props.setShowDelete(mapid) }>
                            <i className="material-icons entry-button">delete_outline</i>
                    </WButton>
                    
            </WCol>
        </WRow>
        
    );
};

export default MapTableEntry;
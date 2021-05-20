import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const MapTableEntry = (props) => {
    const { data } = props;
    const name = data.name; 
    // const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';
    // const assignedToStyle = data.completed ? 'complete-task-assignedTo' : 'incomplete-task-assignedTo';

    // const description = data.description;
    // const due_date = data.fullName;
    // const status = data.completed ? 'complete' : 'incomplete';
    // const assigned_to = data.assigned_to;

    // const canMoveUp = props.index > 0 ? true : false;
    // const canMoveDown = props.index < props.entryCount-1 ? true : false;
    
    const [editingName, toggleNameEdit] = useState(false);
    // const [editingDescr, toggleDescrEdit] = useState(false);
    // const [editingStatus, toggleStatusEdit] = useState(false);
    // const [editingAssigned, toggleAssignEdit] = useState(false);

    const disabledButton = () => {}

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = name;
        if(newName !== prevName) {
            props.editName(data._id, 'name', newName, prevName);
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
    // const editOptions = {
    //     onClick:'{() => toggleNameEdit(!editingName)}',
    //     wType: "texted", 
    //     clickAnimation: props.disabled || !props.canRedo ? "" : "ripple-light" ,
    //     shape: "rounded"
    // }
    const deleteOptions = {
        onClick:"{() => handleDelete()}",
        wType: "texted", 
        clickAnimation: props.disabled || !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

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
                        : <div className="table-text"
                        >{name}
                        </div>
                }
            </WCol>

            <WCol size="1" className="table-entry-col">
                {

                    <WButton title="Edit Name" color="colored" shape="rounded" hoverAnimation= "lighten"
                                onClick={(e) => toggleNameEdit(!editingName)}
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
                                onClick={(e) => toggleNameEdit(!editingName)}>
                            <i className="material-icons entry-button">delete_outline</i>
                    </WButton>
                    
            </WCol>
        </WRow>
        
    );
};

export default MapTableEntry;
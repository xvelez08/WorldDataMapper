import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const RegionTableEntry = (props) => {
    const { data } = props;

    const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';
    const assignedToStyle = data.completed ? 'complete-task-assignedTo' : 'incomplete-task-assignedTo';

    const name = data.name;
    const capital = data.capital; 
    const leader = data.leader;

   

    const canMoveUp = props.index > 0 ? true : false;
    const canMoveDown = props.index < props.entryCount-1 ? true : false;
    
    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    const disabledButton = () => {}

    const handleCapitalEdit = (e) => {
        toggleCapitalEdit(false);
        const newCapital = e.target.value ? e.target.value : 'No Capital';
        const prevCapital = capital;
        if(newCapital !== prevCapital) {
            props.editRegion(data._id, 'capital', newCapital, prevCapital);
        }

    };

    const handleNameEdit = (e) => {
        toggleNameEdit(false);
        const newName = e.target.value ? e.target.value : 'No Name';
        const prevName = name;
        if(newName !== prevName) {
            props.editRegion(data._id, 'name', newName, prevName);
        }
    };

    const handleLeaderEdit = (e) => {
        toggleLeaderEdit(false);
        const newLeader = e.target.value ? e.target.value : 'No Leader';
        const prevLeader = leader;
        if(newLeader !== prevLeader) {
            props.editRegion(data._id, 'leader', newLeader, prevLeader);
        }
    };

    // const handleAssignEdit = (e) => {
    //     toggleAssignEdit(false);
    //     const newAssigned = e.target.value ? e.target.value : 'Myself';
    //     const prevAssigned = assigned_to;
    //     if(newAssigned !== prevAssigned) {
    //         props.editRegion(data._id, 'assigned_to', newAssigned, prevAssigned);
    //     }
    // }

    return (
        <WRow className='table-entry'>
            <WCol size="3">
                {
                    editingName || name === ''
                        ? <WInput
                            className='table-input' onBlur={handleNameEdit}
                            onKeyDown={(e) => {if(e.keyCode === 13) handleNameEdit(e)}}
                            autoFocus={true} defaultValue={name} type='text'
                            inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleNameEdit(!editingName)}
                        >{name}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingCapital ? <WInput
                        className='table-input' onBlur={handleCapitalEdit}
                        autoFocus={true} defaultValue={capital} type='text'
                         inputclass="table-input-class"
                    />
                        : <div className="table-text"
                            onClick={() => toggleCapitalEdit(!editingCapital)}
                        >{capital}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                   editingLeader || leader === ''
                   ? <WInput
                       className='table-input' onBlur={handleLeaderEdit}
                       onKeyDown={(e) => {if(e.keyCode === 13) handleLeaderEdit(e)}}
                       autoFocus={true} defaultValue={leader} type='text'
                       inputClass="table-input-class"
                   />
                   : <div className="table-text"
                       onClick={() => toggleLeaderEdit(!editingLeader)}
                   >{leader}
                   </div>
                }
            </WCol>

            <WCol size="2">
                {
                    // editingAssigned || assigned_to === ''
                    //     ? <WInput
                    //         className='table-input' onBlur={handleAssignEdit}
                    //         onKeyDown={(e) => {if(e.keyCode === 13) handleAssignEdit(e)}}

                    //         autoFocus={true} defaultValue={assigned_to} type='text'
                    //         /*wType="outlined" barAnimation="solid" */inputclass="table-input-class"
                    //     />
                    //     : <div className={`${assignedToStyle} table-text`}
                    //         onClick={() => toggleAssignEdit(!editingAssigned)}
                    //     >{assigned_to}
                    //     </div>
                }
            </WCol>
            <WCol size="3">
                <div className='button-group'>
                    <WButton className={canMoveUp ? "table-entry-buttons" : "table-entry-buttons-disabled"} onClick={canMoveUp ? () => props.reorderRegion(data._id, -1) : disabledButton } wType="texted">
                        <i className="material-icons">expand_less</i>
                    </WButton>
                    <WButton className={canMoveDown ? "table-entry-buttons" : "table-entry-buttons-disabled"} onClick={canMoveDown ? () => props.reorderRegion(data._id, 1) : disabledButton } wType="texted">
                        <i className="material-icons">expand_more</i>
                    </WButton>
                    <WButton className="table-entry-buttons" onClick={() => props.deleteRegion(data, props.index)} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>
        </WRow>
    );
};

export default RegionTableEntry;
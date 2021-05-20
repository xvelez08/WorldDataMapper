import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const MapTableHeader = (props) => {
    const clickDisabled = () => { };
    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    
    const undoOptions = {
        className: props.disabled || !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: props.disabled || !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: props.disabled || !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: props.disabled || !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: props.disabled || !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: props.disabled || !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

    return (
        <WRow className="table-header">
            <WCol size="10">
                <WButton onClick={props.disabled ? () => {} : () => props.sort('task') } className='table-header-section' wType="texted" >Maps</WButton>
            </WCol>
            <WCol size="2">
                <div className="table-header-buttons">
                    {/* <WButton {...undoOptions}>
                            <i className="material-icons">undo</i>
                    </WButton>
                    <WButton  {...redoOptions}>
                            <i className="material-icons">redo</i>
                    </WButton> */}
                    <WButton onClick={props.disabled ? clickDisabled : props.createNewMap} wType="texted" className={`${buttonStyle}`} clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">add_box</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : props.setShowDelete} wType="texted" className={`${buttonStyle}`} clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">delete_outline</i>
                    </WButton>
                    {/* <WButton onClick={props.disabled ? clickDisabled : () => props.setActiveList({})} wType="texted" className={`${buttonStyle}`} clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">close</i>
                    </WButton> */}
                </div>
                <i class="fas fa-globe-americas fa-10x globe2"></i>
            </WCol>            
        </WRow>
    );
};

export default MapTableHeader;
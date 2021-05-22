import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import EditAccount                      from '../modals/EditAccount';
import RegionMainContents 				from '../mapscreen/RegionMainContents';
import Delete                           from '../modals/Delete'     
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAPS } 				    from '../../cache/queries';
import React, { useState } 				from 'react';
import {Redirect}                       from 'react-router'; 
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WNavItem, WButton }            from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateMapField_Transaction, 
	SortItems_Transaction,
	UpdateMapRegion_Transaction, 
	ReorderItems_Transaction, 
	EditRegion_Transaction } 				from '../../utils/jsTPS';



// TODO: Will need to import different transactions here to use 
const RegionHomescreen = (props) => {
    // const keyCombination = (e, callback) => {
	// 	if(e.key === 'z' && e.ctrlKey) {
	// 		if(props.tps.hasTransactionToUndo()) {
	// 			tpsUndo();
	// 		}
	// 	}
	// 	else if (e.key === 'y' && e.ctrlKey) { 
	// 		if(props.tps.hasTransactionToRedo()) {
	// 			tpsRedo();
	// 		}
	// 	}
	// }
    // document.onkeydown = keyCombination;

    const auth = props.user === null ? false : true;
    const userName = auth ? props.user.fullName : "";
    let mapLists = []; 
    let regionList = []; 
    let mapName = "";
    const [sortRule, setSortRule] = useState('unsorted');
    const [showEdit, toggleShowEdit] 	    = useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
    const [showDelete, toggleShowDelete] 	= useState(false);
    const [userFullName, setUserName]       = useState(userName);
    const [displayMap, setDisplayMap]       = useState(null);
    const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());
     const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
     if(loading) { console.log(loading, 'loading');}
     if(error){ console.log(error, 'error');}
     if(data){
        for(let map of data.getAllMaps){
            mapLists.push(map);
            if(map._id == props.activeMap){
                regionList = map.regions;
                console.log(regionList);
                mapName = map.name;
            } 
        }
        console.log(mapName);
        console.log(data.getAllMaps);
        console.log(props.activeMap);
        let currentMap = props.activeMap;

     }
     console.log(props.activeMap);
     const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }], 
		awaitRefetchQueries: true,
		// onCompleted: () => reloadList()
	}

	// const [ReorderMapItems] 		    = useMutation(mutations.REORDER_ITEMS, mutationOptions);
	const [sortMapItems] 		    = useMutation(mutations.SORT_REGIONS, mutationOptions);
	const [UpdateRegionField] 	        = useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);
	const [UpdateMapField] 	            = useMutation(mutations.UPDATE_MAP_FIELD, mutationOptions);
	const [AddRegion] 			        = useMutation(mutations.ADD_REGION, mutationOptions);
	const [DeleteRegion] 			    = useMutation(mutations.DELETE_REGION, mutationOptions);
	const [AddMap] 			            = useMutation(mutations.ADD_MAP);
	const [DeleteMap] 			        = useMutation(mutations.DELETE_MAP);
    
    const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

    const refetchMaps = async (refetch) => {
		const { loading, error, data } = await refetch();
		if (data) {
			// mapLists = data; 
			// if (activeList._id) {
			// 	let tempID = activeList._id;
			// 	let list = todolists.find(list => list._id === tempID);
			// 	setActiveList(list);
			// }
            console.log("data wass here")
		}
	}
    const clickDisabled = () => {};
    const editRegion = async (regionID, field, value, prev) => {
		let flag = 0;
		if (field === 'completed') flag = 1;
		let mapID = props.activeMap;
        console.log(mapID)
		let transaction = new EditRegion_Transaction(mapID, regionID, field, prev, value, flag, UpdateRegionField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};
    const undoOptions = {
        className:  !props.tps.hasTransactionToUndo() ? ' table-header-button-disabled ' : 'table-header-button',
        onClick:  !props.tps.hasTransactionToUndo()  ? clickDisabled : tpsUndo,
        wType: "texted", 
        clickAnimation:  !props.tps.hasTransactionToUndo() ? "" : "ripple-light",  
        shape: "rounded",
        id:"undo-btn"
    }

    const redoOptions = {
        className: props.disabled || !props.tps.hasTransactionToRedo() ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: props.disabled || !props.tps.hasTransactionToRedo()   ? clickDisabled : tpsRedo, 
        wType: "texted", 
        clickAnimation: props.disabled || !props.tps.hasTransactionToRedo() ? "" : "ripple-light" ,
        shape: "rounded",
        id:"redo-btn"
    }
     const createNewMap = async () => {
         let newmap = {
             _id: '',
             name: "Untitled",
			 owner: props.user._id,
             regions: [],
             sortRule: 'name', // What to sort by
             sortDirection: 1 //1 ascending -1 descending
         }

         const { data } = await AddMap({ variables: { map: newmap }, refetchQueries: [{ query: GET_DB_MAPS }] });
         await refetchMaps(refetch); 
            if(data){
             //Add map to list or load it
                // let _id = data.addMap; 
                // console.log(data.addMap);
                // mapLists = data.addMap; 
                console.log(data); 
             }
     }

     const updateMapField = async (_id, field, value, prev) => {
         let mapID = props.activeMap;
         let transaction = new EditRegion_Transaction(_id, field, prev, value, UpdateMapField);
         props.tps.addTransaction(transaction);
         tpsRedo();
     }
  
    const addRegion = async () => {
		let map = props.activeMap;
		const newRegion = {
			_id: '',
            name: 'No Name',
			capital: 'No Description',
            owner: '',
			leader: 'No Date',
            flag: 'No Flag', 
            landmarks: []
		};
		let opcode = 1;
		let regionID = newRegion._id;
		let mapID = map;
		let transaction = new UpdateMapRegion_Transaction(mapID, regionID, newRegion, opcode, AddRegion, DeleteRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

    const deleteRegion = async (region, index) => {
		let mapID = props.activeMap;
		let regionID = region._id;
		let opcode = 0;
		let regionToDelete = {
			_id: region._id,
			description: region.name,
			capital: region.capital,
			leader: region.leader,
			flag: region.flag, 
            landmarks:region.landmarks
		}
		let transaction = new UpdateMapRegion_Transaction(mapID, regionID, regionToDelete, opcode, AddRegion, DeleteRegion, index);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

    const sort = (criteria) => {
		let prevSortRule = sortRule;
		setSortRule(criteria);
		let transaction = new SortItems_Transaction(props.activeMap, criteria, prevSortRule, sortMapItems);
		console.log(transaction)
		props.tps.addTransaction(transaction);
		tpsRedo();
		
	}

     //-------------------Modals Setup-------------------

     const setShowLogin = () => {
		toggleShowEdit(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowEdit(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowEdit = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowEdit(!showEdit)
	};
    const setShowDelete = (_id) => {
        props.setActiveMap(_id); 
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowDelete(!showDelete)
	};
    
    return (
        
        <WLayout wLayout="header">
            <WLHeader>
                <WNavbar color="colored">
                    <ul>
                        <WNavItem>
                            <Logo  className='logo' />
                        </WNavItem>
                    </ul>
                    <ul>
                        <NavbarOptions 
                            fetchUser={props.fetchUser}     auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
                            setShowEdit={setShowEdit}       
							// reloadTodos={refetch} 			//setActiveList={loadTodoList}
                            setUserName={setUserName}       userName={props.userName}   
                        />
                    </ul>
                </WNavbar>
            </WLHeader>
            <WLMain>
                {  
                    <>
                    <div className="add-region-button-header">
                    <WButton id="add-region-btn" onClick={addRegion} wType="texted"  clickAnimation={"ripple-light" }>
                    <i className="material-icons" id="add-region-icon">add_box</i>
                    </WButton>
                    <WButton {...undoOptions}>
                            <i className="material-icons">undo</i>
                    </WButton>
                    <WButton  {...redoOptions}>
                            <i className="material-icons">redo</i>
                    </WButton>
                    <h1>Map: {mapName}</h1>
                    </div>
                    <RegionMainContents
                        auth={auth} user={props.user} updateMapField={updateMapField} sort={sort}
                        activeMap={props.activeMap} createNewMap={createNewMap} setShowDelete={setShowDelete}
                        mapName={mapName}  regions={regionList} editRegion={editRegion} deleteRegion={deleteRegion}
                        canUndo={canUndo} 	canRedo={canRedo} undo={tpsUndo} redo={tpsRedo}
                    />
                   
                   </>
                    
                }
              
            </WLMain>
            {
				showEdit && (<EditAccount user = {props.user} fetchUser={props.fetchUser} setShowEdit={setShowEdit} />)
			}

			{
				showCreate && (<CreateAccount setUserName={setUserName}   fetchUser={props.fetchUser} fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
                //TODO: replace reloadTodos={refetch} here 
				showLogin && (<Login setUserName={setUserName}   fetchUser={props.fetchUser} setShowLogin={setShowLogin} />)
			}
            
            {
                showDelete && (<Delete  setShowDelete={setShowDelete} activeMap={props.activeMap}/>)
            }

        </WLayout>

    );
};
export default RegionHomescreen; 
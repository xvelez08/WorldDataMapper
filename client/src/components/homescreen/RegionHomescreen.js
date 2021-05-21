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
            } 
        }
        // console.log(data.getAllMaps);
        // console.log(props.activeMap);
        let currentMap = props.activeMap;

     }
     console.log(props.activeMap);
     const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }], 
		awaitRefetchQueries: true,
		// onCompleted: () => reloadList()
	}

	// const [ReorderMapItems] 		    = useMutation(mutations.REORDER_ITEMS, mutationOptions);
	// const [sortMapItems] 		    = useMutation(mutations.SORT_ITEMS, mutationOptions);
	const [UpdateMapItemField] 	    = useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);
	const [UpdateMapField] 	            = useMutation(mutations.UPDATE_MAP_FIELD, mutationOptions);
	const [AddRegion] 			    = useMutation(mutations.ADD_REGION, mutationOptions);
	const [DeleteRegion] 			= useMutation(mutations.DELETE_REGION, mutationOptions);
	const    [AddMap] 			        = useMutation(mutations.ADD_MAP);
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
         let transaction = new UpdateMapField_Transaction(_id, field, prev, value, UpdateMapField);
         props.tps.addTransaction(transaction);
         tpsRedo();
     }
     const deleteMap = async (_id) => {
        console.log(_id);
		DeleteMap({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_MAPS }] });
		console.log("Map deleted:  "+ _id)
	};
    const addRegion = async () => {
		let map = props.activeMap;
		const newRegion = {
			_id: '',
            name: 'No Name',
			capital: 'No Description',
            owner: '',
			leader: 'No Date'

		};
		let opcode = 1;
		let regionID = newRegion._id;
		let mapID = map;
		let transaction = new UpdateMapRegion_Transaction(mapID, regionID, newRegion, opcode, AddRegion, DeleteRegion);
		props.tps.addTransaction(transaction);
		tpsRedo();
	};

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
                    <WButton onClick={addRegion} wType="texted"  clickAnimation={"ripple-light" }>
                    <i className="material-icons" id="add-region-button">add_box</i>
                    </WButton>
                    <RegionMainContents
                        auth={auth} user={props.user} updateMapField={updateMapField}
                        activeMap={props.activeMap} createNewMap={createNewMap} setShowDelete={setShowDelete}
                        displayMap={displayMap}  regions={regionList}
                    />
                    </>
                    //Setup main contents here
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
                showDelete && (<Delete deleteMap ={deleteMap} setShowDelete={setShowDelete} activeMap={props.activeMap}/>)
            }

        </WLayout>

    );
};
export default RegionHomescreen; 
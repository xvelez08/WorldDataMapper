import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import EditAccount                      from '../modals/EditAccount';
import MainContents 					from '../main/MainContents';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAPS } 				    from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WNavItem }            from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
const ObjectId = require('mongoose').Types.ObjectId;
// TODO: Will need to import different transactions here to use 

const Homescreen = (props) => {
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
    const [showEdit, toggleShowEdit] 	    = useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
    const [showDelete, toggleShowDelete] 	= useState(false);
    const [userFullName, setUserName]       = useState(userName);
    // const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	// const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());
     const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);
     if(loading) { console.log(loading, 'loading');}
     if(error){ console.log(error, 'error');}
     if(data){
        for(let map of data.getAllMaps){
            mapLists.push(map); 
        }
        console.log(data.getAllMaps);

     }
     const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }], 
		awaitRefetchQueries: true,
		// onCompleted: () => reloadList()
	}

	// const [ReorderMapItems] 		= useMutation(mutations.REORDER_ITEMS, mutationOptions);
	// const [sortMapItems] 		    = useMutation(mutations.SORT_ITEMS, mutationOptions);
	// const [UpdateMapItemField] 	= useMutation(mutations.UPDATE_REGION_FIELD, mutationOptions);
	// const [UpdateMaplistField] 	= useMutation(mutations.UPDATE_MAP_FIELD, mutationOptions);
	// const [DeleteMapItem] 			= useMutation(mutations.DELETE_REGION, mutationOptions);
	// const [AddMapItem] 			= useMutation(mutations.ADD_REGION, mutationOptions);
	const    [AddMap] 			        = useMutation(mutations.ADD_MAP);
    
	// const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);


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
    const setShowDelete = () => {
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
                            setUserName={setUserName}       userName={userFullName}   
                        />
                    </ul>
                </WNavbar>
            </WLHeader>
            <WLMain>
                {  
                    <MainContents
                        auth={auth} user={props.user}
                        mapList={mapLists} createNewMap={createNewMap}
                    />
                    
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

        </WLayout>

    );
};
export default Homescreen; 
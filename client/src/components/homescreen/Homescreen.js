import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import EditAccount                      from '../modals/EditAccount';
import MainContents 					from '../main/MainContents';
import * as mutations 					from '../../cache/mutations';
import * as queries                     from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WNavItem }            from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
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
    let maps = []; 
    const userName = auth ? props.user.fullName : "";

    const [showEdit, toggleShowEdit] 	    = useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
    const [userFullName, setUserName]       = useState(userName);
    // const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	// const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);
     if(loading) { console.log(loading, 'loading');}
     if(error){ console.log(error, 'error');}
     if(data){
         //TODO: Setup loading of maps here
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
                    <MainContents/>
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
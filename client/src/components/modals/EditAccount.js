import React, { useState } 	from 'react';
import { EDIT_ACCOUNT }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';


import { WModal, WMHeader, WMFooter, WMMain, WButton, WInput, WRow, WCol } from 'wt-frontend';

const EditAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', fullName: '', _id: ''});
	const [loading, toggleLoading] = useState(false);
	const [EditAccount] = useMutation(EDIT_ACCOUNT);
	const errorMsg = "User info not found.";
	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleEditAccount = async (e) => {
		let user = await props.fetchUser();
		let _id = user.data.getCurrentUser._id;
		let newInput = {}; 
		console.log(user.data.getCurrentUser._id);
		for(let field in user.data.getCurrentUser){
			Object.keys(user.data.getCurrentUser).forEach(field =>{
				// console.log(user.data.getCurrentUser[field]);
				newInput[field] = user.data.getCurrentUser[field]; 
			});
		}
		console.log(newInput); 
		for (let field in input) {
			//Remove empty fields 
			// let newInput = {_id:_id};
			Object.keys(input).forEach(field =>{
				if(!input[field]){
					const newIn = {...input, [field]:newInput[field]}; 
					setInput(newIn);
				}
			});
		}
		console.log(input);
		const { loading, error, data } = await EditAccount({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (data.editAccount._id === null) {
			console.log(errorMsg);
			return;
		}
		if (data) {
			// console.log(data)
			toggleLoading(false);
			// toggleLoading(false);
			// if(data.register.email === 'already exists') {
			// 	alert('User with that email already registered');
			// }
			// else {
			// 	props.fetchUser();
			// }
            // props.setUserName(data.register.fullName);
			// props.setShowCreate(false);
            

		};
	};
    return (
		<WModal className="edit-modal"  cover="true" visible={props.setShowEdit}>
			<WMHeader  className="modal-header" onClose={() => props.setShowEdit(false)}>
				Edit Your Account
			</WMHeader>
			{
				loading ? <div />
					: <WMMain>
							<WRow className="modal-col-gap edit-modal">
								<WCol size="12">
									<WInput 
										className="" onBlur={updateInput} name="fullName" labelAnimation="up" 
										barAnimation="solid" labelText="Name" wType="outlined" inputType="text" 
									/>
								</WCol>
							</WRow>
							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
								barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
							/>
							<div className="modal-spacer">&nbsp;</div>
							<WInput 
								className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
								barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
							/>
					</WMMain>
			}
			<WMFooter>
				<WButton className="modal-button" onClick={handleEditAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="primary">
					Submit
				</WButton>
			</WMFooter>
			
		</WModal>
	);
}
export default EditAccount; 
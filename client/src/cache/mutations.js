import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			fullName
			password
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $fullName: String!) {
		register(email: $email, password: $password, fullName: $fullName) {
			email
			password
			fullName
		}
	}
`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;
export const EDIT_ACCOUNT = gql`
	mutation EditAccount($email: String, $password: String, $fullName: String, $_id:String!) {
		editAccount(email: $email, password: $password, fullName:$fullName, _id:$_id) {
			email 
			_id
			fullName
			password
		}
	}
`;
export const ADD_MAP = gql`
	mutation AddMap($map: MapInput!) {
		addMap(map: $map) {
			_id
			name
			owner
			regionList
		}
	}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!) {
		deleteMap(_id: $_id)
	}
`;
// export const ADD_ITEM = gql`
// 	mutation AddItem($item: ItemInput!, $_id: String!, $index: Int!) {
// 		addItem(item: $item, _id: $_id, index: $index)
// 	}
// `;

// export const DELETE_ITEM = gql`
// 	mutation DeleteItem($itemId: String!, $_id: String!) {
// 		deleteItem(itemId: $itemId, _id: $_id) {
// 			_id
// 			description
// 			due_date
// 			assigned_to
// 			completed
// 		}
// 	}
// `;

// export const UPDATE_ITEM_FIELD = gql`
// 	mutation UpdateItemField($_id: String!, $itemId: String!, $field: String!, $value: String!, $flag: Int!) {
// 		updateItemField(_id: $_id, itemId: $itemId, field: $field, value: $value, flag: $flag) {
// 			_id
// 			description
// 			due_date
// 			assigned_to
// 			completed
// 		}
// 	}
// `;

// export const REORDER_ITEMS = gql`
// 	mutation ReorderItems($_id: String!, $itemId: String!, $direction: Int!) {
// 		reorderItems(_id: $_id, itemId: $itemId, direction: $direction) {
// 			_id
// 			description
// 			due_date
// 			assigned_to
// 			completed
// 		}
// 	}
// `;

// export const SORT_ITEMS = gql`
// 	mutation SortItems($_id: String!, $criteria: String!) {
// 		sortItems(_id: $_id, criteria: $criteria) {
// 			_id
// 			description
// 			due_date
// 			assigned_to
// 			completed
// 		}
// 	}
// `;

// export const ADD_TODOLIST = gql`
// 	mutation AddTodolist($todolist: TodoInput!) {
// 		addTodolist(todolist: $todolist) {
// 			_id
// 			name
// 			owner
// 			items {
// 				_id
// 				description
// 				due_date
// 				assigned_to
// 				completed
// 			}
// 			sortRule
// 			sortDirection
// 		}
// 	}
// `;

// export const DELETE_TODOLIST = gql`
// 	mutation DeleteTodolist($_id: String!) {
// 		deleteTodolist(_id: $_id)
// 	}
// `;

// export const UPDATE_TODOLIST_FIELD = gql`
// 	mutation UpdateTodolistField($_id: String!, $field: String!, $value: String!) {
// 		updateTodolistField(_id: $_id, field: $field, value: $value)
// 	}
// `;

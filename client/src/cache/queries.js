import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			fullName
			email
		}
	}
`;
export const GET_DB_MAPS = gql`
	query GetDBMaps{
		getAllMaps{
			_id
			name
			owner
			regions {
				_id
				name
				capital
				owner
				leader
				flag
				landmarks
			}
			sortRule
			sortDirection
		}
	}
`;

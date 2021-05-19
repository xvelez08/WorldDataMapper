// const { gql } = require('apollo-server');
// const regionDef = require('./region-def').typeDefs;

// const typeDefs = gql `
//     type Map{
//         _id: String!
//         name: String!
//         owner: String!
//     }
//     extend type Query{
//         getAllMaps:[Map]
//         getMapById(_id:String!):Map
//     }
//     extend type Mutation{
//         addMap(map:MapInput!):Map 
//         deleteMap(mapId:String!, _id:String!):[Map]
//         updateMapName(_id:String!, field:String!, value:String!):[Map]
//     }
//     input MapInput {
//         _id: String
//         name: String
//         owner: String
//     }
// `
// module.exports = { typeDefs: typeDefs }
// //
// // deleteRegion(mapId:String!, _id:String!):[Region]
// //         addRegion(region:Region!):[Region]

const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map {
		_id: String!
		name: String!
		owner: String!
		regions: [Region]
		sortRule: String!
		sortDirection: Int!
	}
	type Region {
		_id: String!
		name: String!
		capital: String!
		owner: String!
		leader:  String!
	}
	extend type Query {
		getAllMaps: [Map]
		getMapById(_id: String!): Map 
	}
	extend type Mutation {
		addRegion(region: RegionInput!, _id: String!, index: Int!): String
		addMap(map: MapInput!): Map
		deleteRegion(regionId: String!, _id: String!): [Region]		
		deleteMap(_id: String!): Boolean
		updateMapField(_id: String!, field: String!, value: String!): String
		updateRegionField(regionId: String!, _id: String!, field: String!, value: String!, flag: Int!): [Region]
		reorderRegions(itemId: String!, _id: String!, direction: Int!): [Region]
		sortRegions(_id: String!, criteria: String!): [Region]
	}
	input FieldInput {
		_id: String
		field: String
		value: String
	}
	input MapInput {
		_id: String!
		name: String!
		owner: String!
		regions: [RegionInput]
		sortRule: String!
		sortDirection: Int!
	}
	input RegionInput {
		_id: String!
		name: String!
		capital: String!
		owner: String!
		leader:  String!
	}
`;

module.exports = { typeDefs: typeDefs }
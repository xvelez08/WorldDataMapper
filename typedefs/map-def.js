const { gql } = require('apollo-server');
const regionDef = require('./region-def').typeDefs;

const typeDefs = gql `
    type Map{
        _id: String!
        name: String!
        owner: String!
        regionList:[String]
    }
    extend type Query{
        getAllMaps:[Map]
        getMapById(_id:String!):Map
    }
    extend type Mutation{
        addMap(map:MapInput!):String
        deleteMap(mapId:String!, _id:String!):[Map]
        updateMapName(_id:String!, field:String!, value:String!):[Map]
    }
    input MapInput {
        _id: String
        name: String
        owner: String
        regionList:[String]
    }
`
module.exports = { typeDefs: typeDefs }
//
// deleteRegion(mapId:String!, _id:String!):[Region]
//         addRegion(region:Region!):[Region]
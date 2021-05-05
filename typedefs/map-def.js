const { gql } = require('apollo-server');


const typeDefs = gql `
    type Map{
        _id: String!
        name: String!
        owner: String!
        regionList:[Region]
    }
    extend type Query{
        getAllMaps:[Map]
        getMapById(_id:String!):Map
    }
    extend type Mutation{
        addMap(map:MapInput!):String
        deleteMap(mapId:String!, _id:String!):[Map]
        deleteRegion(mapId:String!, _id:String!):[Region]
        addRegion(region:Region!):[Region]
        updateMapName(_id:String!, field:String!, value:String!):[Map]
    }
    input MapInput {
        _id: String
        name: String
        owner: String
        regionList:[Region]
    }
`
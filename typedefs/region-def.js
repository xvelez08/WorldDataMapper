const { gql } = require('apollo-server');


const typeDefs = gql `
    type Region{
        _id: String!
        name: String!
        owner: String!
        capital:String
        leader:String
        flag:String
        parentRegionId:String
        landmarks:[String]
        subRegionIds:[String]
    }
    extend type Query{
        getAllRegions:[Region]
        getRegionByOwner:[Region]
        getRegionById(_id:String!):Region
    }
    extend type Mutation{
        deleteSubRegion(mapId:String!, _id:String!):[Region]
        addSubRegion(subRegionId:String!, _id:String):[Region]
        editMap(mapId:String!, _id:String!, name:String, regionList:[String], owner:String!):Map
    }
`
module.exports = { typeDefs: typeDefs }
// extend type Query{
//     getAllRegions:[Region]
//     getRegionByOwner:[Region]
//     getRegionById(_id:String!):Region
// }
// extend type Mutation{
//     deleteSubRegion(mapId:String!, _id:String!):[Region]
//     addSubRegion(region:Region!):[Region]
//     editMap(mapId:String!, _id:String!, name:String, regionList:[Region], owner:User!):Map
// }
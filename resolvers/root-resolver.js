const userResolvers = require('./user-resolvers');
// const todolistResolvers = require('./todolist-resolvers');
const mapResolvers = require('./map-resolvers');
//Fix below as well 
module.exports = [userResolvers, mapResolvers];
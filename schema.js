const { makeExecutableSchema } = require("graphql-tools")
const gql = String.raw

import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, './common/schemas'))
const typeDefs = mergeTypes(typesArray, { all : true })

// for some reason, the fileLoader is not working for the resolvers
// const resolversArray = fileLoader(path.join(__dirname, './resolvers'));
// const resolvers = mergeResolvers(resolversArray);

// for now, individually add the resolvers
import UserResolver from './common/resolvers/user'
const resolvers = [ UserResolver ]


console.log("Resolvers ", resolvers)

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

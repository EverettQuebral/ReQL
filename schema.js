const { makeExecutableSchema } = require("graphql-tools")
const gql = String.raw

import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, './common/schemas'))
const typeDefs = mergeTypes(typesArray, { all : true })

const resolversArray = fileLoader(path.join(__dirname, './common/resolvers'));
const resolvers = mergeResolvers(resolversArray);

console.log("Resolvers ", resolvers)

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

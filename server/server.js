const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const bodyParser = require("body-parser");
const debug = require('debug')('app:server');
const cors = require('cors')

import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'


import { schema } from './schema';
import { request } from "https";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

const server = createServer(app);

// we may need to add a middleware for handling the authorization/authentication
app.post(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    tracing: true,
    cacheControl: true,
    context: {
      secrets: {
        TM_API_KEY: "somekeyherejustasanexample"
      },
      headers : req.headers
    }
  }))
);


const gql = String.raw;

// TODO:: this endpoint should only be accessible in DEVELOPMENT mode, should be part of the deployment mechanism
if (process.env.NODE_ENV === "DEVELOPMENT"){
  debug('Running GraphiQL ', process.env.NODE_ENV);
  app.get(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql",
      query: gql`
query {
  getUsers{
    first_name
    last_name
    email
    password
    id
    address{
      state
      zip
      country
    }
  }
  
  findUser(id:"xxxx"){
    first_name
  }
  
  getConfig{
    type
    props {
      className
      id
    }
    attributes {
      text
    }
  }
}
      `
    })
  );
}

app.use(express.static("public"));

// app.listen(PORT, () =>{
//   console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
//   console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
// });

server.listen(PORT, () => {
  new SubscriptionServer({
    execute,
    subscribe,
    schema: schema
  },
  {
    server: server,
    path: '/subscriptions'
  })
})



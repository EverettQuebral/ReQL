# Building React powered by GraphQL application

## (Work in Progress)

The intention of this document is help beginners create an application using **React**, **GraphQL**, and **Apollo**.  There are some other requirements but assuming that the audience knows **NodeJS**, **JavaScript**, **Babel**, etc.  Also the document requires the audience some knowledge about **React**, **GraphQL** and **Apollo** as the intentional result of this manual is to provide a working application that can scale to most known use case.

# Code Structure

Understanding the capabilities and functionality of the app is essential on how we are going to create the structure of the code.  There are two key items here where there are the server components and then the client component.  First the server components will take care of getting the data from whatever sources up to delivering the first initial load.  This is true for **Server Side Rendering** (SSR) which will give the power to scale and support UI client agnostically.  Second is the client where all the client sources will reside that will eventually end up in the browser.  Things like *javascript*, *css*, *images*, *fonts* will go to some static folder after a build.  We need to be careful in setting up the boundaries for the static sources because when we use a packager such as **WebPack**, then we need to understand where are we going to pick those up.

## Server Components

The **GraphQL** should be in the server where it will connected to the necessary data sources.  It will be powered by expressjs and mapping the routes to */graphql* and */graphiql* respectively.  

**/graphql** will be the main endpoint for resolving graphql queries from the client
**/graphiql** pronouced as graphical is the endpoint for resolving the graphql UI client tool

Let's assume that the starting point for the server is *server.js* then this is how it's going to look like.

### server.js

```javascript {.line-numbers}
const express = require("express")
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = express.env.PORT || 3000;
const app = express();
const gql = String.raw;

import { schema } from './schema';

app.use(cors());

app.post(
  "/graphql", 
  bodyParser.json(),
  graphqlExpress(req => {
    schema,
    tracing,
    cacheControl: true,
    context: {
      secrets: {
        API_KEY: "someapikeysecrethere"
      },
      headers: req.headers
    }
  })
);

if (process.env.NODE_ENV === "DEVELOPMENT" ){
  app.get(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql",
      query: gql `
        query {
          findUser {
            last_name
            first_name
          }
        }`
    })
  )
}

app.use(express.static("public"));

app.listen(PORT, () =>{
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});
```

Let's drill down a little on the code above and explain the parts where it's essential

[Cors (https://www.npmjs.com/package/cors)] is the middleware that allows the **Access-Control-Allow-Origin** to be configured
```javascript
app.use(cors());
```

Now let's look at the first request handler **/graphql**
```javascript {.line-numbers}
app.post(
  "/graphql", 
  bodyParser.json(),
  graphqlExpress(req => {
    schema,
    tracing,
    cacheControl: true,
    context: {
      secrets: {
        API_KEY: "someapikeysecrethere"
      },
      headers: req.headers
    }
  })
);
```

Again, I'm not going to drill down to specifics about express.  This code block takes care of the request going to /graphql and let the bodyParser middleware to transform the request to json then calls the graphqlExpress and pass meaningful config for global use.  
* **schema** is the definition of GraphQL for checking the request and response.  
* **tracing** is for adding more information about the time, session, etc to be returned on the response.
* **cacheControl** to tell graphql to use cache
* **context** the json config object that can be passed to all the request
* **headers** to pass the req.headers from express to GraphQL

Let's look at the second block of the code
```javascript {.line-numbers}
if (process.env.NODE_ENV === "DEVELOPMENT" ){
  app.get(
    "/graphiql",
    graphiqlExpress({
      endpointURL: "/graphql",
      query: gql `
        query {
          findUser {
            last_name
            first_name
          }
        }`
    })
  )
}
```

We only enable the route to the **GraphiQL** tool when the environment is set to *DEVELOPMENT*  to allow the engineer to quickly check a graphql query and see the result.  The **graphiqlExpress** is the function that Apollo implemented specific of expressjs use. We call it by passing the following properties.
* **endpointURL** the url that it will use to send the request
* **query** the gql query that will be used as a default in the UI tool

Lastly the part where express will expose the application to handle the request.
```javascript {.line-numbers}
app.listen(PORT, () =>{
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});
```

That should be our *server.js* and enough to serve traffic for /graphql and /graphiql.  

### schema.js
Notice that we imported the schema and added it to the configuration when we defined the **graphqlExpress** in the server.js.  This schema is the result of merging the resolvers and type definition for GraphQL.  Please feel free to read about [GraphQL Schemas and Types (https://graphql.org/learn/schema/)] as we will not discuss those topics here but we will just create the schemas and types that will import for the configuration.

But before we dig into schema.js, let's focus on the /schemas directory where all the schemas are defined.  The /schemas directory should be shared by the client and server application therefore it make sense to put in under the root directory.

* /server
    * server.js
    * schema.js
* /client
    * client.js
* /schemas
    * user.graphql
* /resolvers
    * user.js

### Schema and Types
The structure above gives us a little bit of detail on how the application is structured so far.  Now let's look at the *graphql* files where we define the types.
```javascript
type User {
    id: ID!
    first_name: String!
    last_name: String!
    address: Address
    email: String!
    password: String!
}

type Query {
    findUser(id: ID!): User
    getUsers: [User]
}

input UserInput {
    first_name: String!
    last_name: String!
    address: AddressInput!
    email: String!
    password: String!
}

type Mutation {
    addUser(input: UserInput): StatusMessage
}
```
As I have said, we're not going to dig deep into graphql schemas and types but it's fairly easy to understand that we have a couple of types which defines the **User**, **Query**, and **Mutation**, the input type is a special type where it is used for the post mechanism in adding new users tha will be facilitated by the **Mutation**

Now let's take a look at the resolver for the users.graphql
```javascript class:"lineNo"
import { find } from 'lodash';
import { 
  User,
  UserInput,
  UserInputMessage,
  Address, 
  AddressInput,
  StatusMessage 
} from '../common/index';


const myFavoriteArtists = [
  {
    id: "xxxx",
    first_name: "Michael",
    last_name: "Jackson",
    address: "Los Angeles",
    email: "michael@jackson.com",
    password: "secret"
  },
  {
    id: "yyyy",
    first_name: "Bruno",
    last_name: "Mars",
    address: "Hawaii",
    email: "bruno@mars.com",
    password: "secret secret"
  }
];

export default {
  Query: {
    findUser: (root, args, context) => {
      const id = args.id;
      const user = find(myFavoriteArtists, { 'id' : id });
      return user;
    },
    getUsers: (root, args, context) => {
      return myFavoriteArtists;
    }
  },
  Mutation: {
    addUser: (root, args, context) => {
      const user = args.input;
      myFavoriteArtist.push(user);
      const statusMessage = new StatusMessage(200, 'SUCCESS', 'Successfully entered the new User');
      return statusMessage;
    }
  }
}
```
The code above simply defines a couple of depencies like the common objects that are needed.  For example we need the User Object, UserInput Object and so on and so forth so let's just add the whole code that we imported and it should look like this
```javascript
export class User {
  constructor(firstName, lastName, address, email, password){
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.address = address;
    this.email = email;
    this.password = password;
  }
}

export class UserInput extends User {
  constructor(firstName, lastName, address, email, password){
    super(firstname, lastname, address, email, password);
  }
}

export class UserInputMessage {
  constructor(status, description){
    this.status = status;
    this.description = description;
  }
}

export class StatusMessage {
  constructor(status_code, message, description){
    this.status_code = status_code;
    this.message = message;
    this.description = description || message;
  }
}

export class Address {
  constructor(address1, address2, city, state, zip, country){
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
  }
}

export class AddressInput extends Address {
  constructor(address1, address2, city, state, zip, country){
    super(address1, address2, city, state, zip, country);
  }
}
```

Now let's go and break it down to what we currently have.  In the **user.graphql** we have defined a type for **User**, a type of **Query**, and input and a type of **Mutation**.  These requires objects and thus we imported the code above to instantiate the values that are passed specially for the Mutation.  If we are going to execute assuming that we have all that is necessary for the application to run, then we'll have something like this.
```javascript
query {
  getUsers {
    first_name
  }
}

// returns
{
  "data": {
    "getUsers": [
      {
        "first_name": "Michael"
      },
      {
        "first_name": "Bruno"
      },
      {
        "first_name": "Lady"
      },
      {
        "first_name": "Madonna"
      }
    ]
  },
  "extensions": {
    "tracing": {
      "version": 1,
      "startTime": "2018-06-21T20:16:58.022Z",
      "endTime": "2018-06-21T20:16:58.023Z",
      "duration": 1165831,
      "execution": {
        "resolvers": [
          {
            "path": [
              "getUsers"
            ],
            "parentType": "Query",
            "fieldName": "getUsers",
            "returnType": "[User]",
            "startOffset": 382602,
            "duration": 591695
          },
          {
            "path": [
              "getUsers",
              0,
              "first_name"
            ],
            "parentType": "User",
            "fieldName": "first_name",
            "returnType": "String!",
            "startOffset": 1019010,
            "duration": 29167
          },
          {
            "path": [
              "getUsers",
              1,
              "first_name"
            ],
            "parentType": "User",
            "fieldName": "first_name",
            "returnType": "String!",
            "startOffset": 1066887,
            "duration": 17632
          },
          {
            "path": [
              "getUsers",
              2,
              "first_name"
            ],
            "parentType": "User",
            "fieldName": "first_name",
            "returnType": "String!",
            "startOffset": 1097281,
            "duration": 8989
          },
          {
            "path": [
              "getUsers",
              3,
              "first_name"
            ],
            "parentType": "User",
            "fieldName": "first_name",
            "returnType": "String!",
            "startOffset": 1122312,
            "duration": 20805
          }
        ]
      }
    },
    "cacheControl": {
      "version": 1,
      "hints": [
        {
          "path": [
            "getUsers"
          ],
          "maxAge": 0
        }
      ]
    }
  }
}
```
And if we try to add a new user using the **Mutation** 
```javascript
mutation {
  addUser(input:{
    first_name: "Larry"
    last_name: "Bird"
    email: "larry@bird.com"
    password: "somesecrethere"
    address:{
      address1: "1st Street"
      address2: ""
      city: "Boston"
      state: "MA"
      zip: "64848"
      country: "USA"
    }
  }){
    message
  }
}

//result
{
  "data": {
    "addUser": {
      "message": "SUCCESS"
    }
  }
}
```
If you look closely at the result, the object that we are interested is the **data** while the **extensions** are important and why it's showing up is because of the config properties we set in the **graphqlExpress** handler **tracing** and **cacheControl**.  Starting from this point I'll just omit those values so we can focus only on the necessary parts.

Before we end this section, let's just take a look back at the resolver for the User
```javascript
// some code removed
export default {
  Query: {
    /**
     * findUser(id: "uniqueId")
     */
    findUser: (root, args, context) => {
      const id = args.id
      const user = find(myFavoriteArtists, { 'id' : id })
      return user
    },
    /**
     * getUsers 
     */
    getUsers: (root, args, context) => {
      return myFavoriteArtists
    }
  },
  Mutation: {
    /**
     * addUser(input: {
     *  first_name: String!
     *  last_name: String!
     *  ...
     *  address: {
     *    address1: String1
     *    address2: String1
     *    ...
     *  }
     * }) {
     *  message 
     * }
     */
    addUser: (root, args, context) => {
      const user = args.input
      user.id = Math.random().toString(36).substr(2, 9);
      myFavoriteArtists.push(user)
      const statusMessage = new StatusMessage(200, 'SUCCESS', 'Successfully entered the new User')
      return statusMessage
    }
  }
}
```
In **graphqlExpress**, the handlers for the **Query** and **Mutation** will receive a couple of parameters like *root*, *args*, *context*, etc but the most important are what's mentioned here.
* *args* let's us pass the payload just like in the example, we passed in the UserInput
* *context* is when we can pass headers, request, session information.  Also a good place to pass API_KEY and such

And lastly it returned a *statusMessage* where it says **SUCCESS**  

Adding the last bit of pieces here where the necessary graphql files are added under the /schema folder.
address.graphql
```javascript
type Address {
  id: ID!
  address1: String!
  address2: String
  city: String!
  state: String!
  zip: String!
  country: String!
}

fragment addressDetails on Address {
  address1
  city
  state
  zip
}

input AddressInput {
  address1: String!
  address2: String
  city: String!
  state: String!
  zip: String!
  country: String!
}

type Query {
  address: Address!
}
```
And the statusmessage.graphql
```javascript
type StatusMessage {
    status_code: Int!
    message: String!
    description: String!
}
```
And lastly, the **schema.js** that we imported to the **server.js** where all the resolvers and types are merged together
```javascript
import { makeExecutableSchema } from 'graphql-tools'
import path from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, '../common/schemas'))
const typeDefs = mergeTypes(typesArray, { all : true })

const resolversArray = fileLoader(path.join(__dirname, '../common/resolvers'));
const resolvers = mergeResolvers(resolversArray);

console.log("Resolvers ", resolvers)

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
```

At this point we should be able to run the server and see the GraphiQL interface and run some query.  Let's now install the necessary packages then run the server
```bash
$ npm install
$ npm run server

> NODE_ENV=DEVELOPMENT babel-node server/server.js --presets es2015,stage-2
Resolvers  [ { Query:
     { findUser: [Function: findUser],
       getUsers: [Function: getUsers] },
    Mutation: { addUser: [Function: addUser] } } ]
GraphQL Server is now running on http://localhost:3000/graphql
View GraphiQL at http://localhost:3000/graphiql
```
And point your browser to the http://localhost:3000/graphiql

You can try this application as it is deployed in a Free Web Dyno in Heroku at http://eqsystems.herokuapp.com just please take note that it might take sometime to load on a normal startup since heroku shuts down their free web dyno when no traffic is detected.

Also a client app is available running under heroku which is also on a free web dyno http://eqsystemclient.herokuapp.com





















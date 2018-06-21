# Building React powered by GraphQL application

The intention of this document is help beginners create an application using **React**, **GraphQL**, and **Apollo**.  There are some other requirements but assuming that the audience knows **NodeJS**, **JavaScript**, **Babel**, etc.  Also the document requires the audience some knowledge about **React**, **GraphQL** and **Apollo** as the intentional result of this manual is to provide a working application that can scale to most known use case.

# Code Structure

Understanding the capabilities and functionality of the app is essential on how we are going to create the structure of the code.  There are two key items here where there are the server components and then the client component.  First the server components will take care of getting the data from whatever sources up to delivering the first initial load.  This is true for **Server Side Rendering** (SSR) which will give the power to scale and support UI client agnostically.  Second is the client where all the client sources will reside that will eventually end up in the browser.  Things like *javascript*, *css*, *images*, *fonts* will go to some static folder after a build.  We need to be careful in setting up the boundaries for the static sources because when we use a packager such as **WebPack**, then we need to understand where are we going to pick those up.

## Server Components

The **GraphQL** should be in the server where it will connected to the necessary data sources.  It will be powered by expressjs and mapping the routes to */graphql* and */graphiql* respectively.  

**/graphql** will be the main endpoint for resolving graphql queries from the client
**/graphiql** pronouced as graphical is the endpoint for resolving the graphql UI client tool

Let's assume that the starting point for the server is *server.js* then this is how it's going to look like.

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














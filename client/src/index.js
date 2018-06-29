import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Page from './components/Page'
import registerServiceWorker from './registerServiceWorker'
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-boost'
import { WebSocketLink } from 'apollo-link-ws'
import { ApolloLink, split } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { getMainDefinition } from 'apollo-utilities'
import Container from './components/Container'


const httpLink = new HttpLink({ uri: 'http://127.0.0.1:4000/graphql'})
const wsLink = new WebSocketLink({
  uri: 'ws://127.0.0.1/4000',
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  // link : ApolloLink.from([httpLink]),
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})


//ReactDOM.render(<Page />, document.getElementById('root'));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Container />
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker();

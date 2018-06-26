<<<<<<< HEAD
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Page from './components/Page'
import registerServiceWorker from './registerServiceWorker'
import { HttpLink, InMemoryCache, ApolloClient } from 'apollo-client-preset'
import { ApolloLink, split } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { getMainDefinition } from 'apollo-utilities'


const httpLink = new HttpLink({ uri: 'http://127.0.0.1:4000/graphql'})

const client = new ApolloClient({
    link : ApolloLink.from([httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true
})


//ReactDOM.render(<Page />, document.getElementById('root'));

ReactDOM.render(
    <ApolloProvider client={client}>
        <Page />
    </ApolloProvider>,
    document.getElementById('root')
)


=======
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
>>>>>>> refs/remotes/origin/master
registerServiceWorker();

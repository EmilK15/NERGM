import React from 'react';
import { Main } from './containers/';
import { render } from 'react-dom';
import '../../public/stylesheets/styles.scss';
import { BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';

let link;
if(process.env.NODE_ENV === 'production')
    link = createUploadLink({ uri: process.env.PRODUCTION_URL });
else
    link = createUploadLink({ uri: "http://localhost:3000/graphql" });

const cache = new InMemoryCache();
const client = new ApolloClient({
    link,
    cache,
    credentials: 'same-origin'
});

render((<ApolloProvider client={client}>
        <Router>
            <Main />
        </Router>
    </ApolloProvider>),
document.getElementById('root'));

serviceWorker.unregister();
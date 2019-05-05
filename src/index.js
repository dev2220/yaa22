// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {I18nextProvider} from 'react-i18next';
import {ThemeProvider} from 'styled-components';
import configureStore from 'shared/store/configureStore';
import {apolloClient} from 'shared/services/api/graphqlService';
import {i18n} from 'shared/services';
import theme from 'shared/theme';
import {ApolloProvider} from 'react-apollo-hooks';

import {App} from 'app';

const history = createBrowserHistory();

const store = configureStore({history, i18n});

const Root = () => (
  <ApolloProvider client={apolloClient}>
    <Provider {...{store}}>
      <BrowserRouter>
        <I18nextProvider {...{i18n}}>
          <ThemeProvider {...{theme}}>
            <App />
          </ThemeProvider>
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

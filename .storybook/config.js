import React from 'react';
import {configure, addDecorator} from '@storybook/react';
import styled, {ThemeProvider} from 'styled-components';
import centered from '@storybook/addon-centered';

import {apolloClient} from 'shared/services/api/graphqlService';
import {ApolloProvider} from 'react-apollo-hooks';

import theme from '../src/shared/theme';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const Wrapper = styled.div``;

addDecorator(centered);

addDecorator(story => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <Wrapper>{story()}</Wrapper>
    </ThemeProvider>
  </ApolloProvider>
));

configure(loadStories, module);

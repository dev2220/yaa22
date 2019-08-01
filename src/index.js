// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
import theme, {GlobalStyles} from 'shared/theme';

import {App} from 'app';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Root = () => (
  <BrowserRouter>
    <ThemeProvider {...{theme}}>
      <Wrapper>
        <GlobalStyles />
        <App />
      </Wrapper>
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// @flow
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, withRouter} from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
import theme, {GlobalStyles} from 'shared/theme';

import {App} from 'app';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const ScrollToTop = withRouter(({children, location: {pathname}}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
});
const Root = () => (
  <BrowserRouter>
    <ThemeProvider {...{theme}}>
      <Wrapper>
        <GlobalStyles />
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Wrapper>
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

import {createGlobalStyle} from 'styled-components';
import 'rc-tooltip/assets/bootstrap_white.css';
import 'rc-switch/assets/index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'rc-dropdown/assets/index.css';
import {faCheck, faMinus} from '@fortawesome/free-solid-svg-icons';
import {tooltipCss, switchCss, timePickerCss, dropdownCss} from './externalCss';
import colors from './colors';

const layoutSizes = {
  navBar: {
    height: {mobile: 65, desktop: 80},
  },
  sideBar: {width: 240},
  sticky: {width: 300},
  card: {padding: 32, width: 975},
  stickyBar: {height: 48},
};

const typography = {
  headers: {
    sizes: {large: 32, medium: 24, small: 18, xSmall: 16},
    fontWeights: {light: 300, normal: 'normal', bold: 'bold'},
  },
  texts: {
    sizes: {medium: 13},
    fontWeights: {light: 300, normal: 'normal', bold: 600},
  },
};

const inputs = {
  input: {
    padding: 8,
    sizes: {extraShort: '190px', short: '305px', medium: '390px', large: '524px', full: '100%'},
  },
  checkbox: {
    height: 15,
    textColor: colors.black,
    checkBoxSize: 15,
    helperBorderWidth: 1,
    disabledTextColor: colors.grey,
    helperBorderColor: colors.grey,
    helperColor: colors.blue,
    helperShadowColor: colors.blue,
    selectedColor: colors.blue,
    invalidColor: colors.red,
    checkIcons: {check: faCheck, minus: faMinus},
  },
  defaultMarginAfterInputField: 24,
};

export const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');

  html{
    direction:rtl;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans',sans-serif;
    font-size: ${typography.texts.sizes.medium}px;
    color:${colors.black};
    background-color: ${colors.greyBackground};
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: normal;
    line-height: 1;
  }
  
  a {
    text-decoration: none;
  }

  button, input, select, textarea, div {
    font-family: 'Open Sans',sans-serif;
    font-weight: normal;
    border: none;
    line-height: normal;
    font-size: 13px;
    &:focus{
      outline: none;
    }
  }
  ${tooltipCss};
  ${switchCss};
  ${timePickerCss};
  ${dropdownCss};
  .ReactModal__Body--open{
    overflow:hidden;
  }
  .emoji-mart-bar:last-child {
    display: none;
  }
  .emoji-mart-category-list {
    li{
      cursor: pointer;
    }
  }
  .emoji-mart-category {
    .emoji-mart-emoji {
      span {
        cursor:pointer !important;
      }
    }
  }  
  .emoji-mart {
    .emoji-mart-emoji {
      cursor: pointer;
    }
  }
  .emoji-mart-anchor {
    cursor: pointer;
  }
`;

export default {
  palette: {...colors},
  typography,
  ...inputs,
  ...layoutSizes,
};

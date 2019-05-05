import {css} from 'styled-components';
import baseColors from './colors';

const colors = {
  primary: baseColors.blue,
  secondary: baseColors.white,
  tertiary: baseColors.greyBlack,
  inActive: baseColors.greyWhite,
};

export const tooltipCss = css`
  .rc-tooltip {
    opacity: 1 !important;
    background-color: transparent;
    .rc-tooltip-inner {
      padding: 12px 0;
      padding-left: 12px;
      padding-right: 25px;
      color: white;
      box-shadow: 0 3px 8px 0 #adadad;
    }
    &.rc-tooltip-placement-bottom .rc-tooltip-content {
      .rc-tooltip-arrow {
        margin-top: 5px;
        left: calc(50% - 6px);
        top: -8px;
        border-width: 0px 12px 9px;
      }
      .rc-tooltip-inner {
        margin-top: 5px;
      }
    }
    &.rc-tooltip-placement-top .rc-tooltip-content {
      .rc-tooltip-arrow {
        bottom: -8px;
        left: calc(50% - 6px);
        border-width: 9px 12px 0;
        margin-bottom: 5px;
      }
      .rc-tooltip-inner {
        margin-bottom: 5px;
      }
    }
    &.rc-tooltip-placement-left .rc-tooltip-content {
      .rc-tooltip-arrow {
        right: -11px;
        margin-top: -10px;
        border-width: 12px 0 12px 12px;
        margin-right: 5px;
      }
      .rc-tooltip-inner {
        margin-right: 5px;
      }
    }
    &.rc-tooltip-placement-right .rc-tooltip-content {
      .rc-tooltip-arrow {
        left: -11px;
        margin-top: -10px;
        border-width: 12px 12px 12px 0;
        margin-left: 5px;
      }
      .rc-tooltip-inner {
        margin-left: 5px;
      }
    }
  }

  .primary {
    .rc-tooltip-inner {
      background-color: ${colors.primary};
      color: white;
      border: none;
    }
    &.rc-tooltip-placement-bottom .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-bottom-color: ${colors.primary};
      }
    }
    &.rc-tooltip-placement-top .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-top-color: ${colors.primary};
      }
    }
    &.rc-tooltip-placement-left .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-left-color: ${colors.primary};
      }
    }
    &.rc-tooltip-placement-right .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-right-color: ${colors.primary};
      }
    }
  }

  .secondary {
    .rc-tooltip-inner {
      background-color: ${colors.secondary};
      color: black;
      border: none;
    }
    &.rc-tooltip-placement-bottom .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-bottom-color: ${colors.secondary};
      }
    }
    &.rc-tooltip-placement-top .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-top-color: ${colors.secondary};
      }
    }
    &.rc-tooltip-placement-left .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-left-color: ${colors.secondary};
      }
    }
    &.rc-tooltip-placement-right .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-right-color: ${colors.secondary};
      }
    }
  }

  .tertiary {
    .rc-tooltip-inner {
      background-color: ${colors.tertiary};
      color: white;
      border: none;
    }
    &.rc-tooltip-placement-bottom .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-bottom-color: ${colors.tertiary};
      }
    }
    &.rc-tooltip-placement-top .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-top-color: ${colors.tertiary};
      }
    }
    &.rc-tooltip-placement-left .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-left-color: ${colors.tertiary};
      }
    }
    &.rc-tooltip-placement-right .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-right-color: ${colors.tertiary};
      }
    }
  }
  .forthiary {
    .rc-tooltip-inner {
      background-color: black;
      color: white;
      border: none;
    }
    &.rc-tooltip-placement-bottom .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-bottom-color: black;
      }
    }
    &.rc-tooltip-placement-top .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-top-color: black;
      }
    }
    &.rc-tooltip-placement-left .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-left-color: black;
      }
    }
    &.rc-tooltip-placement-right .rc-tooltip-content {
      .rc-tooltip-arrow {
        border-right-color: black;
      }
    }
  }
`;

export const switchCss = css`
  .rc-switch {
    height: 12px;
    width: 25px;
    border-color: ${baseColors.white};
    background-color: ${baseColors.white};

    &:after {
      box-shadow: none;
      background-color: ${baseColors.greyWhite}; /*TODO: should be changed can't pick the color from zeplin*/
      border-color: ${baseColors.greyWhite}; /*TODO: should be changed can't pick the color from zeplin*/
      left: -1px;
      width: 14px;
      height: 14px;
      top: -2px;
    }
    &-checked {
      border-color: #b2dff6;
      background-color: #b2dff6;
      &:after {
        background-color: ${colors.primary};
        box-shadow: none;
        left: 10px;
        height: 14px;
        width: 14px;
      }
    }
    &:hover:after {
      transform: none;
      animation-name: none;
    }
  }
`;

export const timePickerCss = css`
  .rc-calendar-picker {
    z-index: 1;
  }
  .rc-time-picker-panel {
    z-index: 1;
    .rc-time-picker-panel-inner {
      margin-top: 40px;

      .rc-time-picker-panel-input-wrap {
        display: none;
      }
    }

    .rc-time-picker-panel-select {
      font-size: 14px;

      li {
        height: 30px;
        width: auto;
        line-height: 30px;

        &.rc-time-picker-panel-select-option-selected {
          font-weight: normal;
          color: white;
          background: ${baseColors.selected};
        }

        &:hover {
          color: white;
          background: ${baseColors.blueSecondary};
        }
      }
    }
  }
`;

export const dropdownCss = css`
  .rc-dropdown {
    font-family: inherit;
    font-size: inherit;

    .rc-dropdown-menu {
      border: none;
      min-width: 109px;

      > .rc-dropdown-menu-item-selected {
        background-color: transparent;

        &:after {
          display: none;
        }
      }
      > .rc-dropdown-menu-item {
        color: inherit;
        cursor: pointer;
        height: 38px;
        padding-top: 10px;
        &:hover {
          color: #333333;
          background-color: #f1f1f1;
        }
      }
    }
  }
`;

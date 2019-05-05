import React from 'react';

const withHover = (Component, propName = 'hovering') =>
  class WithHover extends React.Component {
    state = {hovering: false};
    mouseOver = () => this.setState({hovering: true});
    mouseOut = () => this.setState({hovering: false});

    render() {
      const props = {
        ...this.props,
        [propName]: this.state.hovering,
      };

      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
        </div>
      );
    }
  };

export default withHover;

import React from "react";
import styled from "styled-components";

import * as Colors from "../../Constants/colors";

class PopOverComponent extends React.Component {
  state = {
    displayPopOver: this.props.displayPopOver || false
  };
  showPopup = () => {
    this.setState({ displayPopOver: true });
  };
  hidePopup = () => {
    this.setState({ displayPopOver: false });
  };
  render() {
    const { children, position, className, message } = this.props;
    const { displayPopOver } = this.state;
    return (
      <span className={className}>
        {displayPopOver && (
          <div className={`popup-bubble popup-${position}`}>
            <div className="popup-message">{message}</div>
          </div>
        )}
        <span className="popup-trigger" onMouseOver={this.showPopup} onMouseLeave={this.hidePopup}>
          {children}
        </span>
      </span>
    );
  }
}

const PopOver = styled(PopOverComponent)`
  position: relative;

  & .popup-trigger {
    display: inline-block;
  }

  & .popup-bubble {
    min-width: 260px;
    max-width: 420px;
    position: absolute;
    z-index: 10;
    &::after {
      content: "";
      position: absolute;
    }
  }

  .popup-top {
    bottom: 100%;
    left: 50%;
    padding-bottom: 9px;
    transform: translateX(-50%);

    &::after {
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-top: 9px solid rgba(0, 0, 0, 0.05);
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .popup-bottom {
    top: 100%;
    left: 50%;
    padding-top: 9px;
    transform: translateX(-50%);

    &::after {
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-bottom: 9px solid rgba(0, 0, 0, 0.05);
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .popup-left {
    top: 50%;
    right: 100%;
    padding-right: 9px;
    transform: translateY(-50%);

    &::after {
      border-left: 9px solid rgba(0, 0, 0, 0.05);
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }

  .popup-right {
    top: 50%;
    left: 100%;
    padding-left: 9px;
    transform: translateY(-50%);

    &::after {
      border-right: 9px solid rgba(0, 0, 0, 0.05);
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }

  .popup-message {
    background: ${Colors.WHITE};
    border-radius: 3px;
    color: ${Colors.BLACK};
    font-size: 0.75rem;
    line-height: 1.4;
    padding: 0.75em;
    text-align: center;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.1), 0px 0px 2px 1px rgba(0, 0, 0, 0.04),
      0px 0px 0px -1px rgba(0, 0, 0, 0.02);
  }
`;

export default PopOver;

import React from "react";
import styled from "styled-components";

import * as Colors from "../../Constants/colors";

class ToolTip extends React.Component {
  state = {
    displayTooltip: this.props.displayTooltip || false
  };
  showTooltip = () => {
    this.setState({ displayTooltip: true });
  };
  hideTooltip = () => {
    this.setState({ displayTooltip: false });
  };
  render() {
    const { children, position, className, message } = this.props;
    const { displayTooltip } = this.state;
    return (
      <span className={className}>
        {displayTooltip && (
          <div className={`tooltip-bubble tooltip-${position}`}>
            <div className="tooltip-message">{message}</div>
          </div>
        )}
        <span
          className="tooltip-trigger"
          onMouseOver={this.showTooltip}
          onMouseLeave={this.hideTooltip}
        >
          {children}
        </span>
      </span>
    );
  }
}

const AppToolTip = styled(ToolTip)`
  position: relative;

  & .tooltip-trigger {
    display: inline-block;
  }

  & .tooltip-bubble {
    min-width: 120px;
    max-width: 210px;
    position: absolute;
    z-index: 10;
    &::after {
      content: "";
      position: absolute;
    }
  }

  .tooltip-top {
    bottom: 100%;
    left: 50%;
    padding-bottom: 9px;
    transform: translateX(-50%);

    &::after {
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-top: 9px solid ${Colors.BLACK};
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .tooltip-bottom {
    top: 100%;
    left: 50%;
    padding-top: 9px;
    transform: translateX(-50%);

    &::after {
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-bottom: 9px solid ${Colors.BLACK};
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .tooltip-left {
    top: 50%;
    right: 100%;
    padding-right: 9px;
    transform: translateY(-50%);

    &::after {
      border-left: 9px solid ${Colors.BLACK};
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }

  .tooltip-right {
    top: 50%;
    left: 100%;
    padding-left: 9px;
    transform: translateY(-50%);

    &::after {
      border-right: 9px solid ${Colors.BLACK};
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }

  .tooltip-message {
    background: ${Colors.BLACK};
    border-radius: 3px;
    color: #ffffff;
    font-size: 0.75rem;
    line-height: 1.4;
    padding: 0.75em;
    text-align: center;
  }
`;

export default AppToolTip;

import React from "react";
import PropTypes from "prop-types";
import { find, get, isFunction } from "lodash";
import styled from "styled-components";
import onClickOutside from "react-onclickoutside";
import Button from "../Button";

import dropIcon from "../../assets/icons/triangle.svg";

class DropdownComponent extends React.Component {
  state = {
    toggleDisplay: false
  };

  handleClickOutside = evt => {
    this.setState({ toggleDisplay: false });
  };

  select = ({ e, item }) => {
    e.stopPropagation();
    const { onSelect } = this.props;
    this.setState({
      toggleDisplay: !this.state.toggleDisplay
    });
    if (isFunction(get(item, "action"))) {
      item.action();
    } else {
      isFunction(onSelect) && onSelect(item);
    }
  };

  renderListItems = () => {
    let items = [];
    for (let i = 0; i < this.props.list.length; i++) {
      let item = this.props.list[i];
      items.push(
        <span
          className="dropdown-item"
          onClick={e => this.select({ e, item })}
          key={i}
        >
          {item.name}
        </span>
      );
    }
    return items;
  };

  onButtonClicked = ({ e }) => {
    e.stopPropagation();
    const { toggleDisplay } = this.state;
    this.setState({ toggleDisplay: !toggleDisplay });
  };

  render() {
    const { toggleDisplay } = this.state;
    const { icon, className, list, buttonBackgroundColor } = this.props;

    const selectedItem = find(list, item => !!item.selected);

    return list.length > 0 ? (
      <div className={className}>
        <Button
          style={{
            backgroundColor: buttonBackgroundColor || "#ebebec",
            color: "#343949",
            fontSize: "1rem",
            height: 36
          }}
          onClick={e => this.onButtonClicked({ e })}
        >
          {icon ? (
            <img src={icon} alt="Icon Only Button" />
          ) : (
            <React.Fragment>
              <span className="btnText" style={{ paddingRight: 45 }}>
                {get(selectedItem, "name")}
              </span>
              <img
                src={dropIcon}
                className="btnIcon"
                style={{ height: 6 }}
                alt="Dropdown Icon"
              />
            </React.Fragment>
          )}
        </Button>
        <div
          className={`dropdown-menu ${toggleDisplay ? "show" : "hide"}`}
          aria-labelledby="dropdownMenuButton"
          x-placement="bottom-start"
          style={{
            position: "absolute",
            willChange: "transform; top: 0px",
            left: "10px",
            transform: "translate3d(0px, 38px, 0px)"
          }}
        >
          {this.renderListItems()}
        </div>
      </div>
    ) : (
      <StyledEmptyButton />
    );
  }
}

DropdownComponent.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
  onSelect: PropTypes.func
};

const StyledEmptyButton = styled.div`
  width: 20px;
`;

const Dropdown = styled(onClickOutside(DropdownComponent))`
  position: relative;
  .dropdown-menu {
    position: absolute;
    top: 18%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 12rem;
    margin: 0.125rem 0 0;
    text-align: left;
    list-style: none;
    background-clip: padding-box;
    border-radius: 0.25rem;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
  }
  .dropdown-menu.show {
    display: block;
  }
  .dropdown-item {
    display: block;
    min-width: 160px;
    padding: 10px 25px;
    clear: both;
    font-size: 1rem;
    font-weight: 400;
    color: #343949;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
    text-decoration: none;
  }
  .dropdown-item:hover {
    background: #f7f8fb;
    cursor: pointer;
  }
`;
export default Dropdown;

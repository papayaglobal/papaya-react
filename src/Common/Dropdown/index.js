import React from "react";
import Button from "../Button";

import dropIcon from "../../assets/icons/triangle.svg";

import "./index.css";

export default class Dropdown extends React.Component {
  state = {
    toggleDisplay: false,
    selectedItem: this.props.list[0].name
  };
  select = item => {
    this.setState({
      selectedItem: item.name,
      toggleDisplay: !this.state.toggleDisplay
    });
    item.action();
  };
  renderListItems = () => {
    let items = [];
    for (let i = 0; i < this.props.list.length; i++) {
      let item = this.props.list[i];
      items.push(
        <span className="dropdown-item" onClick={this.select.bind(null, item)}>
          {item.name}
        </span>
      );
    }
    return items;
  };
  render() {
    const { toggleDisplay, selectedItem } = this.state;
    const { icon } = this.props;
    return (
      <div className="dropdown">
        <Button
          style={{ backgroundColor: "#ebebec", color: "#343949", fontSize: "1rem", height: 36 }}
          onClick={() => this.setState({ toggleDisplay: !toggleDisplay })}
        >
          {icon ? (
            <img src={icon} alt="Icon Only Button" />
          ) : (
            <React.Fragment>
              <span className="btnText" style={{ paddingRight: 45 }}>
                {selectedItem}
              </span>
              <img src={dropIcon} className="btnIcon" style={{ height: 6 }} alt="Dropdown Icon" />
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
    );
  }
}

import React, { Component } from "react";
import AppButton from "./Common/Button";
import LoadingIcon from "./Common/Loading";
import "./App.css";

import attachment from "./assets/icons/attachment-white.svg";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to papaya</h1>
          <AppButton size="small" type="primary">
          <LoadingIcon color="#ffffff"></LoadingIcon>
            <span className="btnText">Button</span>
          </AppButton>
          <br />
        </header>
      </div>
    );
  }
}

export default App;

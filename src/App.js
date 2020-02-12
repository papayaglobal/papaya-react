import React, { Component } from "react";
import Button from "./Common/Button";
import Spinner from "./Common/Spinner";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="App-header">
          <h1>Welcome to papaya</h1>
          <Button size="small" type="primary">
            <Spinner color="#ffffff" />
            <span className="btnText">Button</span>
          </Button>
          <br />
        </header>
      </div>
    );
  }
}

export default App;

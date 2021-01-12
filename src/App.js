import React, { Component } from "react";
import BackGround from "./components/bg";
import Greetings from "./components/greetings";
import Weather from "./components/weather";
import "./App.css";
import { TextField } from "@material-ui/core";
import Todo from "./components/todo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <bg>
          <BackGround />
        </bg>
        <Greetings></Greetings>
        <Weather></Weather>
        <Todo></Todo>
      </div>
    );
  }
}

export default App;

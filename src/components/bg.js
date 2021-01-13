import React, { Component } from "react";

class BackGround extends Component {
  render() {
    const IMG_NUMBER = 7;
    const rand = Math.floor(Math.random() * IMG_NUMBER);
    return (
      <img
        id="bg"
        src={require("./images/" + rand + ".jpg").default}
        width="100%"
        height="100%"
      />
    );
  }
}

export default BackGround;

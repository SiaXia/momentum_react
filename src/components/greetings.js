import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";

const USER_LS = "currentUser",
  IS_INPUT_ACTIVE = "isInputActive";

class Greetings extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: "",
    isActive: true
  };

  saveName = (text) => {
    localStorage.setItem(USER_LS, text);
  };

  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSubmit = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem(IS_INPUT_ACTIVE, false);
      const currentValue = this.state.name;
      this.saveName(currentValue);
      this.paintGreeting(currentValue);
    }
  };
  paintGreeting = (text) => {
    this.state.greetings = "Hi, "+text;
  };

  loadName = () => {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
      // if he is not
      localStorage.setItem(IS_INPUT_ACTIVE, true);
    } else {
      // if he is
      this.paintGreeting(currentUser);
    }
  };

  render() {
    this.loadName();
    return (
      <div>
        {localStorage.getItem(IS_INPUT_ACTIVE) === 'true' ? (
          <form className="textField">
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="name"
                  onChange={this.handleChange}
                  onKeyPress={this.handleSubmit}
                />
              </Grid>
            </Grid>
          </form>
        ) : (
          <h1>{this.state.greetings}</h1>
        )}
      </div>
    );
  }
}

export default Greetings;

import React, { Component } from "react";
import Clock from "react-live-clock";
import Moment from "react-moment";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class Clocks extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">ㅤ</Container>
        <Container maxWidth="sm">
          <Typography
            align="center"
            component="div"
            style={{ backgroundColor: "white", height: "10vh", opacity: "0.6" }}
          ></Typography>
        </Container>
        <Container maxWidth="sm">
          <Typography
            align="center"
            component="div"
            style={{ backgroundColor: "white", height: "30vh", opacity: "0.6" }}
          >
            <Clock
              id="clock"
              format={"HH:mm:ss / ddd MMM YYYY"}
              ticking={true}
              style={{ color: "white" }}
            ></Clock>
          </Typography>
        </Container>
      </React.Fragment>
    );
  }
}
export default Clocks;

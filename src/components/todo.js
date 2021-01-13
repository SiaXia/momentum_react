import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const TODOS_LS = "toDos";
const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "black",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
let toDos = [];
class Todo extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.inputRef = React.createRef();
    this.listRef = React.createRef();
  }
  state = {
    toDo: "",
  };
  deleteToDo = (event) => {
    const btn = event.target;
    const li = btn.parentNode;
    this.listRef.current.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    this.saveToDos();
  };

  saveToDos = () => {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  };

  paintToDo = (text) => {
    const li = document.createElement("li");
    const delBtn = document.createElement("iconButton");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", this.deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;

    this.listRef.current.appendChild(li);

    const toDoObj = {
      text: text,
      id: newId,
    };
    toDos.push(toDoObj);
    this.saveToDos();
  };

  handleSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const currentValue = event.target.value;
      this.paintToDo(currentValue);
      event.target.value = "";
    }
  };

  loadToDos = (t) => {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function (toDo) {
        t.paintToDo(toDo.text);
      });
    }
  };
  render() {
    //this.loadToDos(this);
    // this.formRef.addEventListener("submit", this.handleSubmit);

    return (
      <div>
        {localStorage.getItem("currentUser") ? (
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
              <Typography
                align="center"
                component="div"
                style={{
                  backgroundColor: "white",
                  height: "10vh",
                  opacity: "0.6",
                }}
              >
                <form ref={this.formRef}>
                  <ValidationTextField
                    ref={this.inputRef}
                    className={useStyles.margin}
                    label="Write something to do"
                    required
                    variant="outlined"
                    id="validation-outlined-input"
                    onKeyPress={this.handleSubmit}
                  />
                </form>
              </Typography>
            </Container>
            <ul ref={this.listRef} style={{fontSize:'20px'}}>to-To List</ul>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

export default Todo;

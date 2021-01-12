import React, { Component } from "react";
const TODOS_LS = "toDos";

let toDos = [];

class Todo extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.inputRef = React.createRef();
    this.listRef = React.createRef();
  }

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
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", this.deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.id = newId;
    li.appendChild(delBtn);
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
      const currentValue = this.inputRef.current.value;
      this.paintToDo(currentValue);
      this.inputRef.current.value = "";
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
        <form ref={this.formRef}>
          <input
            ref={this.inputRef}
            type="text"
            placeholder="Write something to do"
            onKeyPress={this.handleSubmit}
          />
        </form>
        <ul ref={this.listRef}></ul>
      </div>
    );
  }
}

export default Todo;

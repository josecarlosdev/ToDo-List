import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddToDoList from "./components/AddToDoList";
import ToDoList from "./components/ToDoList";
import ToDoListPending from "./components/ToDoListpending";
import ToDoListPublished from "./components/ToDoListPublished"


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/todolist" className="navbar-brand">
          ToDo
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/todolist"} className="nav-link">
              ToDo-List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/published"} className="nav-link">
            Published Tasks
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/todolist"]} component={ToDoListPending} />
          <Route exact path="/add" component={AddToDoList} />
          <Route path="/todolist/:id" component={ToDoList} />
          <Route path="/published" component={ToDoListPublished} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

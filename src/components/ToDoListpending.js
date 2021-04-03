import React, { useState, useEffect } from "react";
import ToDoListDataService from "../services/ToDoListService";
import { Link } from "react-router-dom";

const ToDoListPending = () => {
  const [todolist, setToDoList] = useState([]);
  const [currentToDoList, setCurrentToDoList] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [pending, setpublished] = useState(0);

  useEffect(() => {
    retrieveToDoList();
  }, []);

  const retrieveToDoList = () => {
    ToDoListDataService.getAll()
      .then(response => {
        setToDoList(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveToDoList();
    setCurrentToDoList(null);
    setCurrentIndex(-1);
  };

  const setActiveToDoList = (todo, index) => {
    setCurrentToDoList(todo);
    setCurrentIndex(index);
  };

  const removeAllToDoList = () => {
    ToDoListDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };


    ToDoListDataService.findBypending(pending)
      .then(response => {
        setToDoList(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>ToDo List Pending</h4>
        <ul className="list-group">
          {todolist &&
            todolist.map((todo, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveToDoList(todo, index)}
                key={index}
              >
                {todo.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllToDoList}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentToDoList ? (
          <div>
            <h4>ToDo</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentToDoList.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentToDoList.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentToDoList.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/todolist/" + currentToDoList.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a ToDo List...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDoListPending;

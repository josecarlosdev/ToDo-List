import React, { useState, useEffect } from "react";
import ToDoListDataService from "../services/ToDoListService";

const ToDoList = props => {
  const initialToDoListState  = {
    id: null,
    name: "",
    email: "",
    description: "",
    published: false
  };
  const [currentToDoList, setCurrentToDoList] = useState(initialToDoListState);
  const [message, setMessage] = useState("");

  const getToDoList = id => {
    ToDoListDataService.get(id)
      .then(response => {
        setCurrentToDoList(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getToDoList(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentToDoList({ ...currentToDoList, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentToDoList.id,
      name: currentToDoList.name,
      email: currentToDoList.email,
      description: currentToDoList.description,
      published: status
    };

    ToDoListDataService.update(currentToDoList.id, data)
      .then(response => {
        setCurrentToDoList({ ...currentToDoList, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateToDoList = () => {
    ToDoListDataService.update(currentToDoList.id, currentToDoList)
      .then(response => {
        console.log(response.data);
        setMessage("The ToDo-List was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteToDoList = () => {
    ToDoListDataService.remove(currentToDoList.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/todoslist");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentToDoList ? (
        <div className="edit-form">
          <h4>ToDo-List</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentToDoList.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={currentToDoList.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentToDoList.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentToDoList.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentToDoList.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteToDoList}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateToDoList}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a ToDo-List...</p>
        </div>
      )}
    </div>
  );
};

export default ToDoList;

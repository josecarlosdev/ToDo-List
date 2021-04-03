import React, { useState } from "react";
import ToDoListDataService from "../services/ToDoListService";
import validator from 'validator'

const AddToDoList = () => {
  const initialToDoListState = {
    id: null,
    name: "",
    email :"",
    description: "",
    published: false
  };
  const [todolist, setToDoList] = useState(initialToDoListState);
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('')

  const handleInputChange = event => {
    const { name, value } = event.target;
    setToDoList({ ...todolist, [name]: value });
    validateEmail()
  };
  const validateEmail = (e) => {
    var email = todolist.email
  
    if (validator.isEmail(email)) {
      setEmailError('Valid Email :)')
    } else {
      setEmailError('Enter valid Email!')
    }
  }

  const saveToDoList = () => {
    var data = {
      name: todolist.name,
      email: todolist.email,
      description: todolist.description
    };

    ToDoListDataService.create(data)
      .then(response => {
        setToDoList({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newToDoList = () => {
    setToDoList(initialToDoListState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Task Added successfully!</h4>
          <button className="btn btn-success" onClick={newToDoList}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={todolist.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={todolist.email}
              onChange={handleInputChange}
              name="email"
            />
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{emailError}</span>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={todolist.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveToDoList} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToDoList;

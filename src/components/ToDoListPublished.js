import React, { useState, useEffect } from "react";
import ToDoListDataService from "../services/ToDoListService";
import { Link } from "react-router-dom";

const ToDoListPublished= ({test}) => {
  const [todolist, setToDoListPublished] = useState([]);
  const [currentToDoList, setCurrentToDoListPublished] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [Aut, setAut] = useState();
  const [user, setuser] = useState(null);
  const  [login, setLogin] = useState()
  const onChangeuser = e => {
      const user = e.target.value;
      setuser(user);
      console.log(user)
    };

  useEffect(() => {
    retrieveToDoListPublished();
  }, []);

 
  const retrieveToDoListPublished = () => {
    ToDoListDataService.getAll()
      .then(response => {
        setToDoListPublished(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const authenticate = () =>{
    if (user === "TrabalheNaSaipos"){
      setAut(true)
      setLogin(false)
    }
   
 
  } 

  const setActiveToDoListPublished = (todo, index) => {
    setCurrentToDoListPublished(todo);
    setCurrentIndex(index);
    setLogin(true)
    setAut(false)
  };

    setTimeout(() => {
        ToDoListDataService.findBypublished(1)
        .then(response => {
          setToDoListPublished(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
        
    }, 500);


  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>List of Published Tasks</h4>
        <ul className="list-group">
          {todolist && 
            todolist.map((todo, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveToDoListPublished(todo, index)}
                key={index}
              >
                {todo.name}
              </li>
            ))}
        </ul>
      </div>
     
      <div className="col-md-6">
        {currentToDoList && login ? (
         <div>
           <label>User</label>
           <input
                 type="text"
                 className="form-control"
                 placeholder="Inform your User"
                 value={user}
                 onChange={onChangeuser}  
           />
           <button className="badge badge-success" onClick={authenticate}>Entrar</button>
           <div>
            <br />
            <p>Please inform your user to change the status of the task...</p>
          </div>
         </div>
        ) : (
          <div>
            <br />
            <p>Please click on a ToDo List...</p>
          </div>
        )}
        {currentToDoList && Aut ? (
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
        ):(
        <div></div>
        )}
      </div>
    </div>
    
  );
};

export default ToDoListPublished;

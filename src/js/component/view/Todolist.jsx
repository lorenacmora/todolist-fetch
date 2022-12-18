import React, { useState, useEffect } from "react";

const iniTask = {
  label: "",
  done: false,
};

const urlBase = "https://assets.breatheco.de/apis/fake/todos/user";

const Todolist = () => {
  const [task, setTask] = useState(iniTask);

  const [tasklist, setTaskList] = useState([]);
  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const getTasks = async () => {
    try {
      let response = await fetch(`${urlBase}/lorena`);
      let data = await response.json();
      if (response.ok) [setTaskList(data)];

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async ({ key }) => {
    if (key == "Enter") {
      if (task.label.trim() !== "") {
        try {
          let response = await fetch(`${urlBase}/lorena`, {
            method: "PUT",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify([...tasklist, task]),
          });
          if (response.ok) {
            getTasks();
            setTask(iniTask);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const deleteTask = async (id) => {
    let newTask = tasklist.filter((task, index) => id != index);
    try {
      let response = await fetch(`${urlBase}/lorena`, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify([...newTask]),
      });
      if (response.ok) {
        getTasks();
      }
    } catch (error) {
      console.log(error);
    }
    setTaskList(newTask);
  };

  useEffect(() => getTasks(), []);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <h1 className="text-center">todos</h1>
        <div className="col-12 col md-7">
          <input
            className="form-control border border-gray"
            placeholder="What be to be done?"
            name="label"
            value={task.label}
            onChange={handleChange}
            onKeyDown={addTask}
          />
        </div>
        <div className="col-12 col md-7">
          {tasklist.map((task, index) => {
            return (
              <div
                key={index}
                className="border border-gray"
                onClick={() => deleteTask(index)}
              >
                {task.label}
              </div>
            );
          })}
          {tasklist.length} item left
        </div>
      </div>
    </div>
  );
};

export default Todolist;

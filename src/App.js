import { useState, useEffect } from "react";
import Todo from "./Todo";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";
require("dotenv").config();

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // this code is fired when the app loads
    db.collection("todos")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        // console.log("from DB:", snapshot.docs.map(doc => doc.data().todo));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []); // [] because we don't want it to run but once

  const addTodo = (event) => {
    event.preventDefault();

    // to store in DB todos
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // to store in memory todos
    // setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div className="App">
      <h1>TODO classic app</h1>
      <FormControl style={{ display: "flex" }}>
        <InputLabel style={{ fontSize: "1em" }}>✅ Write a TODO</InputLabel>
        <Input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />

        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          style={{ margin: "5px" }}
          variant="contained"
          color="primary"
        >
          Add TODO
        </Button>
        <ul>
          {todos.map((todo, index) => {
            return <Todo key={index} todo={todo} />;
          })}
        </ul>
      </FormControl>
    </div>
  );
}

export default App;

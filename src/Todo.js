import React, { useState } from 'react';
import './Todo.css';
import { List, ListItem , ListItemText, ListItemAvatar, Avatar, Button, Modal, Input} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
  position: 'absolute',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  width: '100%'
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setopen] = useState(false);
  const [input, setInput] = useState(props.todo.todo);
  const names = ["Emma","Isabella","Emily","Madison","Ava","Olivia","Sophia","Abigail","Elizabeth","Chloe","Samantha","Addison","Natalie","Mia","Alexis","Alyssa","Hannah","Ashley","Ella","Sarah","Grace","Taylor","Brianna","Lily","Hailey","Anna","Victoria","Kayla","Lillian","Lauren","Kaylee","Allison","Savannah","Nevaeh","Gabriella","Sofia","Makayla","Jacob","Michael","Ethan","Joshua","Daniel","Alexander","Anthony","William","Christopher","Matthew","Jayden","Andrew","Joseph","David","Noah","Aiden","James","Ryan","Logan","John","Nathan","Elijah","Christian","Gabriel","Benjamin","Jonathan","Tyler","Samuel","Nicholas","Gavin","Dylan","Jackson","Brandon","Caleb","Mason","Angel","Isaac","Evan","Jack","Kevin","Jose","Isaiah","Luke"]

  const randomAvatar = () => {
    const name = names[Math.floor(Math.random() * names.length)];
    return "https://joeschmoe.io/api/v1/" + name;
  }

  const handleOpen = () => {
    setopen(true);
  };

  const updateTodo = () => {
    // update the Todo with the new input
    db.collection('todos').doc(props.todo.id).set({
      todo: input
    }, {merge: true})
    setopen(false);
  }

  return (
    <React.Fragment>

      <Modal
        open={open}
        onClose={event => setopen(false)}>
          <div className={classes.paper}>
            <h1>Change your todo!</h1>
            <Input style={{width: "70%"}} value={input} onChange={event => setInput(event.target.value)} type="text"/>
            <Button variant="contained" 
                    color="primary" 
                    style={{width: "20%", marginLeft: "20px"}}
                    onClick={updateTodo}>Update Todo</Button>
          </div>
      </Modal>

      <List className="todo__list">
        <ListItem>
        <ListItemAvatar>
          <Avatar src={randomAvatar()}>
            {/* <ImageIcon /> */}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.todo.todo} 
                  secondary="dummy text" />
        </ListItem>
        <div className={classes.root}>
          <Button variant="contained" 
                  color="secondary" 
                  startIcon={<DeleteIcon />} 
                  onClick={event => db.collection('todos').doc(props.todo.id).delete()} >
            DELETE ME
          </Button>
          <Button variant="contained" 
                  color="primary" 
                  onClick={event => setopen(true)}>
            EDIT
          </Button>
        </div>
      </List>
    </React.Fragment>
  )
}

export default Todo
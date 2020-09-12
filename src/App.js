import React, { useState } from 'react';
import './App.css';
import { Form, Button, Container, ListGroup, Modal } from 'react-bootstrap';
import { FaTrash, FaPen } from 'react-icons/fa';


const getId = () => {
  return (Math.random() * 1000).toString()
}

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
  const [show, setShow] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({id: null, value: null})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault()
    setTodos([...todos, { value: input, id: getId() }])
    setInput('')
  }

  const handleDelete = (todoId) => {
    setTodos(todos.filter((item) => item.id !== todoId))
  }

  const handleModify = (todo) => {
    setSelectedTodo(todo)
    handleShow()
  }

  const handleModifyValidation = () => {
    setTodos(todos.map(t => t.id === selectedTodo.id ? selectedTodo : t))
    handleClose()
  }

  console.log(todos);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>To Do</Form.Label>
          <Form.Control placeholder="Enter ToDo" value={input} onChange={e => setInput(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
  </Button>
      </Form>
      <br />
      <ListGroup>
        {
          todos.map(todo => <ListGroup.Item key={todo.id}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <p>{todo.value}</p>
              <div>
                <Button variant="warning" onClick={() => handleModify(todo)}>Modify <FaPen /> </Button>
                <Button variant="danger" onClick={() => handleDelete(todo.id)}>Delete <FaTrash /> </Button>
              </div>
            </div>
          </ListGroup.Item>)
        }
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update TODO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control value={selectedTodo.value} onChange={e => setSelectedTodo({...selectedTodo, value: e.target.value})} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModifyValidation}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default App;
import { useContext, useState } from 'react';
import { Card, Badge, Button, Form } from 'react-bootstrap';
import { TodoContext } from '../context/TodoContext';

const TodoFooter = () => {
  const { todos, deleteTodo, completeTodo, updateTodo } = useContext(TodoContext);
  const [editTodo, setEditTodo] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', dueDate: '', assignedTo: '' });
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'

  const handleEdit = (todo) => {
    setEditTodo(todo.id);
    setEditForm({ title: todo.title, description: todo.description, dueDate: todo.dueDate, assignedTo: todo.assignedTo });
  };

  const handleSaveEdit = (todo) => {
    console.log('Saving edit for ID:', todo.id, 'with data:', editForm);
    updateTodo({ ...todo, ...editForm });
    setEditTodo(null);
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
    setEditForm({ title: '', description: '', dueDate: '', assignedTo: '' });
  };

  const sortedTodos = [...todos].sort((a, b) => {
    const dateA = new Date(a.id); // Assuming id is a timestamp (Date.now())
    const dateB = new Date(b.id);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  return (
    <div className="p-3 white-bg">
      <Card className="mb-2">
        <Card.Body className="text-start d-flex justify-content-between align-items-center">
          <h5>Todos</h5>
          <Button variant="outline-secondary" size="sm" onClick={toggleSortOrder} title={sortOrder === 'newest' ? 'Sort Newest to Oldest' : 'Sort Oldest to Newest'}>
            <i className={`bi ${sortOrder === 'newest' ? 'bi-sort-down' : 'bi-sort-up'}`}></i>
          </Button>
        </Card.Body>
      </Card>
      {sortedTodos.map((todo) => (
        <Card key={todo.id} className="mb-2">
          <Card.Body>
            {editTodo === todo.id ? (
              <Form>
                <Form.Group className="mb-2 text-start">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-2 text-start">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                </Form.Group>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <Form.Group className="text-start">
                      <Form.Label>Due Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={editForm.dueDate}
                        onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="text-start">
                      <Form.Label>Assign to (Person Optional)</Form.Label>
                      <Form.Select
                        value={editForm.assignedTo}
                        onChange={(e) => setEditForm({ ...editForm, assignedTo: e.target.value })}
                      >
                        <option>--Select Person (Optional)--</option>
                        <option value="User1">User1</option>
                        <option value="User2">User2</option>
                        {/* Add more options as needed */}
                      </Form.Select>
                    </Form.Group>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" size="sm" onClick={() => handleSaveEdit(todo)} className="me-2">
                    Save
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </div>
              </Form>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-start">
                  <strong>{todo.title}</strong> - {todo.description} <br />
                  Due: {todo.dueDate} {todo.assignedTo && `| Assigned: ${todo.assignedTo}`}
                </div>
                <div>
                  <Badge bg={todo.completed ? 'success' : 'secondary'} className="me-2">
                    {todo.completed ? 'Completed' : 'Pending'}
                  </Badge>
                  <Button variant="outline-success" size="sm" onClick={() => completeTodo(todo.id)} className="me-2">
                    <i className="bi bi-check"></i>
                  </Button>
                  <Button variant="outline-primary" size="sm" onClick={() => handleEdit(todo)} className="me-2">
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => deleteTodo(todo.id)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TodoFooter;
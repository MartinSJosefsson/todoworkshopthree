import { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { TodoContext } from '../context/TodoContext';

const TodoBody = () => {
  const { todos, addTodo } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [errors, setErrors] = useState({}); 

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!description) newErrors.description = 'Description is required';
    if (!dueDate) newErrors.dueDate = 'Due Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addTodo({ title, description, dueDate, assignedTo });
      setTitle('');
      setDescription('');
      setDueDate('');
      setAssignedTo('');
      setErrors({});
    }
  };

  return (
    <div className="p-3 white-bg">
       <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={!!errors.title}
                placeholder="Enter title"
              />
              <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={!!errors.description}
                placeholder="Enter description"
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>

            <div className="row mb-3">
              <div className="col-md-6">
                <Form.Group className="text-start">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    isInvalid={!!errors.dueDate}
                  />
                  <Form.Control.Feedback type="invalid">{errors.dueDate}</Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="text-start">
                  <Form.Label>Assign to (Person Optional)</Form.Label>
                  <Form.Select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                    <option>--Select Person (Optional)--</option>
                    <option value="User1">User1</option>
                    <option value="User2">User2</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3 text-start">
              <Form.Label>Attachments</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Button variant="primary" type="submit" className="text-start">
              + Add Todo
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TodoBody;
import { useState } from 'react';
import { Nav, Button, Modal, Form } from 'react-bootstrap'; // Ensure all components are imported

const TodoSidebar = ({ onClose }) => {
  const [username, setUsername] = useState('Username');
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleLogoutClick = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
    setLoginData({ username: '', password: '' });
  };

  const handleLoginSubmit = () => {
    if (loginData.username.trim()) { // Basic validation to avoid empty username
      setUsername(loginData.username);
      handleLoginClose();
    }
  };

  return (
    <Nav className="flex-column p-3 h-100">
      <Nav.Link href="#" className="text-start" onClick={onClose}>
        <i className="bi bi-speedometer2 me-2"></i> Dashboard
      </Nav.Link>
      <Nav.Link href="#" className="text-start" onClick={onClose}>
        <i className="bi bi-people me-2"></i> Users
      </Nav.Link>
      <Nav.Link href="#" className="text-start" onClick={onClose}>
        <i className="bi bi-list-task me-2"></i> Tasks
      </Nav.Link>
      <Nav.Link href="#" className="text-start" onClick={onClose}>
        <i className="bi bi-gear me-2"></i> Settings
      </Nav.Link>
      <div className="mt-auto p-2">
        <span className="d-block mb-2">{username}</span>
        <Button variant="primary" onClick={handleLogoutClick} className="text-white">
          <i className="bi bi-box-arrow-right me-2"></i> Logout
        </Button>
      </div>

      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                placeholder="Enter username"
              />
            </Form.Group>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="Enter password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLoginSubmit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Nav>
  );
};

export default TodoSidebar;
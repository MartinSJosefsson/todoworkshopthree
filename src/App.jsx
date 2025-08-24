import { useState } from 'react';
import { Container, Row, Col, Navbar, Button, Offcanvas } from 'react-bootstrap';
import TodoSidebar from './components/TodoSidebar';
import TodoHeader from './components/TodoHeader';
import TodoBody from './components/TodoBody';
import TodoFooter from './components/TodoFooter';
import { TodoProvider } from './context/TodoContext';
import './App.css';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  return (
    <TodoProvider>
      <Container fluid className="p-0">
        <Row className="g-0">
          <Offcanvas show={showSidebar} onHide={handleCloseSidebar} className="d-md-none">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <TodoSidebar onClose={handleCloseSidebar} />
            </Offcanvas.Body>
          </Offcanvas>
          <Col md={2} className="sidebar d-none d-md-block">
            <TodoSidebar />
          </Col>
          <Col md={10}>
            <TodoHeader onShowSidebar={handleShowSidebar} />
            <TodoBody />
            <TodoFooter />
          </Col>
        </Row>
      </Container>
    </TodoProvider>
  );
}

export default App;
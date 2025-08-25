import { Form, InputGroup, Card } from 'react-bootstrap';

const TodoHeader = ({ onShowSidebar, searchTerm, setSearchTerm }) => {
  return (
    <Card className="mb-2">
      <Card.Body className="p-3" style={{ minHeight: '50px' }}>
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="mb-0">Tasks</h4>
          <div className="d-flex align-items-center">
            <InputGroup className="me-2" style={{ maxWidth: '300px' }}>
              <Form.Control
                placeholder="Search Tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
            </InputGroup>
            <button className="btn btn-outline-primary d-md-none" onClick={onShowSidebar}>
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TodoHeader;
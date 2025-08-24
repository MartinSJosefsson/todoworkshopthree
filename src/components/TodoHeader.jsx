import { Form, InputGroup } from 'react-bootstrap';

const TodoHeader = ({ onShowSidebar }) => {
  return (
    <div className="p-3 bg-white border-bottom">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-primary me-2 d-md-none" onClick={onShowSidebar}>
            <i className="bi bi-list"></i>
          </button>
          <h4 className="mb-0">Tasks</h4>
        </div>
        <InputGroup className="ms-auto" style={{ maxWidth: '300px' }}>
          <Form.Control placeholder="Search Tasks..." />
          <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
        </InputGroup>
      </div>
    </div>
  );
};

export default TodoHeader;
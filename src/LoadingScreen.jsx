import { Spinner, Container, Row, Col } from 'react-bootstrap';

const LoadingScreen = ({DarkTheme}) => (
  <Container fluid className={`vh-100 d-flex align-items-center justify-content-center ${DarkTheme.global.value && 'bg-dark text-light' || 'bg-light text-dark'}`}>
    <Row>
      <Col className="text-center">
        <Spinner animation="border" role="status" variant={DarkTheme.global.value && "light" || "dark"} style={{ width: '4rem', height: '4rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h4 className="mt-3">Loading...</h4>
      </Col>
    </Row>
  </Container>
);

export default LoadingScreen;
import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { authSelector } from '../../../services/selectors/authSelector';
import { auth, signInWithGoogle } from '../../../firebase/config';

interface iProps {
}

const Layout:React.FC<iProps> = ({ children }): JSX.Element => {
  const { currentUser } = useSelector(authSelector);
    return (
        <Container>
          <Row>
            <Col xs={12} className="d-flex align-items-center justify-content-between">
              <h5>Logo</h5>
              {
                currentUser ?
                <Button onClick={() => auth.signOut()} variant="outline-danger">Log out</Button>
                :
                <Button onClick={signInWithGoogle} variant="outline-info">Login</Button>
              }
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              {children}
            </Col>
          </Row>
        </Container>
    );
}

export default Layout;
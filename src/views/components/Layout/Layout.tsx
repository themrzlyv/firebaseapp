import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { authSelector } from '../../../services/selectors/authSelector';
import { logInWithGoogle,logOutUser } from '../../ui/Authentication/common/redux/Auth.Slice';

interface iProps {
}

const Layout:React.FC<iProps> = ({ children }): JSX.Element => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);
    return (
        <Container>
          <Row>
            <Col xs={12} className="d-flex align-items-center justify-content-between">
              <h5>Logo</h5>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/auth/login">login</NavLink>
              <NavLink to="/auth/registration">register</NavLink>
              {
                currentUser ?
                <Button onClick={() => dispatch(logOutUser())} variant="outline-danger">Log out</Button>
                :
                <Button onClick={() => dispatch(logInWithGoogle())} variant="outline-info">Login</Button>
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
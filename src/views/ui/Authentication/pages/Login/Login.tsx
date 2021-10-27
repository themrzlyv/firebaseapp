import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Col, FormControl, InputGroup } from 'react-bootstrap';

import { iLogin } from '../../common/@types';
import { logInWithEmail, logInWithGoogle } from '../../common/redux/actionCreators';

const Login: React.FC = () => {

  const dispatch = useDispatch();
  
  const [formValue,setFormValue] = useState<iLogin>({email: '', password: ''});

  const handleSend = () => dispatch(logInWithEmail(formValue))

  return (
    <Col xs={6} className="p-5 border d-flex flex-column align-items-center justify-content-center">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
        <FormControl
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon2"
          value={formValue.email}
          onChange={(e) => setFormValue((prevState) => ({ ...prevState, email: e.target.value}))}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">Password</InputGroup.Text>
        <FormControl
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon3"
          value={formValue.password}
          onChange={(e) => setFormValue((prevState) => ({ ...prevState, password: e.target.value}))}
        />
      </InputGroup>
      <div className="w-100 d-flex align-items-center justify-content-end">
        <Button onClick={handleSend} variant="outline-info">Login</Button>
        <Button onClick={() => dispatch(logInWithGoogle())} variant="outline-danger">Login with Google</Button>
      </div>
    </Col>
  )
}

export default Login;
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Col, FormControl, InputGroup, Button } from 'react-bootstrap';

import { iRegistration } from '../../common/@types';
import { registrationUser, logInWithGoogle } from '../../common/redux/Auth.Slice';

const Registration = () => {
  const [formValue,setFormValue] = useState<iRegistration>({email: '', name: '', password: ''});

  const dispatch = useDispatch();

  const handleSend = () => dispatch(registrationUser(formValue));

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
        <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={formValue.name}
          onChange={(e) => setFormValue((prevState) => ({ ...prevState, name: e.target.value}))}
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
        <Button onClick={handleSend} variant="outline-primary">Sign Up</Button>
        <Button onClick={() => dispatch(logInWithGoogle())} variant="outline-danger">Login with Google</Button>
      </div>
    </Col>
  )
}

export default Registration;
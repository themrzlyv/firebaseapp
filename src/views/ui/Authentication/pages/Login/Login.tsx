import React from 'react'
import { Col, FormControl, InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { auth, signInWithGoogle } from '../../../../../firebase/config';
import { iLogin } from '../../common/@types';

const Login: React.FC = () => {
  const [formValue,setFormValue] = useState<iLogin>({email: '', password: ''});


  const handleSend = async (): Promise<void> => {
    const { email, password } = formValue;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setFormValue({email: '', password: ''});
    } catch (error) {
      console.log(error);
    }
  }

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
        <Button onClick={signInWithGoogle} variant="outline-danger">Login with Google</Button>
      </div>
    </Col>
  )
}

export default Login;
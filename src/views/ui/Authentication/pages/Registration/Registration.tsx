import React from 'react'
import { Col, FormControl, InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { auth, createUserProfileDocument, signInWithGoogle } from '../../../../../firebase/config';
import { iRegistration } from '../../common/@types';

const Registration = () => {
  const [formValue,setFormValue] = useState<iRegistration>({email: '', displayName: '', password: ''});


  const handleSend = async (): Promise<void> => {
    const { email, displayName, password } = formValue;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email,password);

      await createUserProfileDocument({userAuth: user, additionalData: displayName });

      setFormValue({email: '', displayName: '', password: ''});
    } catch (error) {
      console.log(error.message);
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
        <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={formValue.displayName}
          onChange={(e) => setFormValue((prevState) => ({ ...prevState, displayName: e.target.value}))}
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
        <Button onClick={signInWithGoogle} variant="outline-danger">Login with Google</Button>
      </div>
    </Col>
  )
}

export default Registration;
import { auth, signInWithGoogle, createUserProfileDocument } from './firebase/config';
import {useEffect, useState} from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';

const App = () => {
  const [currentUser,setCurrentUser] = useState(null);


  const checkUser = () => auth.onAuthStateChanged( async userAuth => {
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data()
        })
        console.log(currentUser);
      })
    } else {
      setCurrentUser(userAuth)
    }
  })

  useEffect(() => {
    return checkUser();
  },[])

  useEffect(() => console.log(currentUser),[currentUser])


  return (
    <Container fluid>
      <Row className="mb-5">
        <Col xs={12}>
        {
          currentUser ?
          <Button variant="danger" onClick={() => auth.signOut()}>Sign Out</Button> 
          :
          <Button variant="primary" onClick={signInWithGoogle}>Sign in with Google</Button>
        }
        </Col>
      </Row>
      <Row>
        <SignIn />
        <SignUp />
      </Row>
    </Container>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { auth, createUserProfileDocument } from './firebase/config';
import Layout from './views/components/Layout/Layout';
import Authentication from './views/ui/Authentication';
import mainRoutes from './views/ui/routes';
import { authSelector } from './services/selectors/authSelector';
import { setCurrentUser } from './views/ui/Authentication/common/redux/actionCreators';

const App:React.FC = () => {

  const dispatch = useDispatch();

  const { currentUser } = useSelector(authSelector);


  const checkUser = () => auth.onAuthStateChanged( async userAuth => {
    if(userAuth){
      const userRef = await createUserProfileDocument({userAuth});


      userRef?.onSnapshot(snapShot => {
        dispatch(setCurrentUser({ id: snapShot.id, ...snapShot.data()}))
      })
    } else {
      dispatch(setCurrentUser(userAuth));
    }
  })

  useEffect(() => {
    return checkUser();
  },[])

  useEffect(() => console.log(currentUser),[currentUser])


  return (
    <Layout>
      <Switch>
        <Route path={mainRoutes.Authentication.main} component={Authentication} />
      </Switch>
    </Layout>
  );
}

export default App;

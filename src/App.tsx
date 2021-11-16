import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import mainRoutes from '@src/views/ui/routes';

import Layout from '@src/views/components/Layout';
import PrivateRoute from '@src/views/components/PrivateRoute';

import Profile from '@src/views/ui/Profile';
import Authentication from '@src/views/ui/Authentication';
import AdminRoute from '@src/views/components/AdminRoute';
import Admin from '@src/views/ui/Admin';
import CreatePost from '@src/views/ui/Post/pages/CreatePost';
import Posts from '@src/views/ui/Post/pages/Posts';
import { getAllPosts } from '@src/views/ui/Post/common/redux/Post.Slice';
import { useDispatch } from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <Layout>
      <Switch>
        <Route path={mainRoutes.Authentication.main} component={Authentication} />
        <Route path={mainRoutes.Post.main} component={Posts} />
        <PrivateRoute path={mainRoutes.Profile.main} Component={Profile} />
        <AdminRoute path={mainRoutes.Admin.main} Component={Admin} />
        <AdminRoute path={mainRoutes.Post.createPost} Component={CreatePost} />
      </Switch>
    </Layout>
  );
};

export default App;

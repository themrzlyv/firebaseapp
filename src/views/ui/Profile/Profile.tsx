import React from 'react';
import { Grid } from '@mui/material';
import Body from '@src/views/ui/Profile/partials/Body';
import Header from '@src/views/ui/Profile/partials/Header';

interface iProps {}

const Profile: React.FC<iProps> = (): JSX.Element => {
  return (
    <Grid container>
      <Header />
      <Body />
    </Grid>
  );
};

export default Profile;

import React from 'react';
import { Container, Grid } from '@mui/material';

import Header from './blocks/Header';

const Layout: React.FC = ({ children }): JSX.Element => {
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xl={12}>
          <Header />
        </Grid>
        <Grid item xl={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;

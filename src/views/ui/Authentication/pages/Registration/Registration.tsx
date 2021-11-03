import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authSelector } from '../../../../../services/selectors/authSelector';

import { iRegistration } from '../../common/@types';
import { registrationUser, logInWithGoogle } from '../../common/redux/Auth.Slice';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Registration = () => {
  const { currentUser, isLoading } = useSelector(authSelector);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formValue, setFormValue] = useState<iRegistration>({ email: '', name: '', password: '' });

  const dispatch = useDispatch();

  const handleSend = () => dispatch(registrationUser(formValue));

  return (
    <Grid maxWidth="sm" marginX="auto" marginTop={5} paddingX={3}>
      <Paper component="div">
        <Box component="div" paddingX={3} paddingTop={3}>
          <Typography variant="button" component="div">
            Registration
          </Typography>
        </Box>
        <Box component="div" display="flex" flexDirection="column" marginX={3}>
          <FormControl component="div" margin="normal" error size="medium" required>
            <TextField
              id="outlined-email"
              label="Email"
              value={formValue.email}
              variant="standard"
              onChange={(e) =>
                setFormValue((prevState) => ({ ...prevState, email: e.target.value }))
              }
            />
          </FormControl>
          <FormControl component="div" margin="normal" error size="medium" required>
            <TextField
              id="outlined-name"
              label="Name"
              value={formValue.name}
              variant="standard"
              onChange={(e) =>
                setFormValue((prevState) => ({ ...prevState, name: e.target.value }))
              }
            />
          </FormControl>
          <FormControl component="div" margin="normal" error size="medium" required>
            <TextField
              id="outlined-password"
              label="Password"
              value={formValue.password}
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) =>
                setFormValue((prevState) => ({ ...prevState, password: e.target.value }))
              }
            />
          </FormControl>
          <Box
            component="div"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            padding={2}
          >
            <Box component="div" flexGrow={1}>
              <Typography variant="subtitle1" component={NavLink} to="/auth/login" color="error">
                Log in If you have any account
              </Typography>
            </Box>
            <Button onClick={handleSend} size="medium" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={24} thickness={3} variant="indeterminate" />
              ) : (
                'Sign up'
              )}
            </Button>
            <Button
              onClick={() => dispatch(logInWithGoogle())}
              color="error"
              variant="outlined"
              size="medium"
              disabled={isLoading}
              sx={{ marginX: '0.5em' }}
            >
              Google
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Registration;

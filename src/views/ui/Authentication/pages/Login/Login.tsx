import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { iLogin } from '../../common/@types';
import { logInWithEmail, logInWithGoogle } from '../../common/redux/Auth.Slice';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { authSelector } from '../../../../../services/selectors/authSelector';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const { currentUser, isLoading } = useSelector(authSelector);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formValue, setFormValue] = useState<iLogin>({ email: '', password: '' });

  const handleSend = () => dispatch(logInWithEmail(formValue));

  return (
    <Grid maxWidth="sm" marginX="auto" marginTop={5} paddingX={3}>
      <Paper component="div">
        <Box component="div" paddingX={3} paddingTop={3}>
          <Typography variant="button" component="div">
            Sign in
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
              id="outlined-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={formValue.password}
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
              <Typography
                variant="subtitle1"
                component={NavLink}
                to="/auth/registration"
                color="error"
              >
                If you don't account yet
              </Typography>
            </Box>
            <Button onClick={handleSend} size="medium" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={24} thickness={3} variant="indeterminate" />
              ) : (
                'Sign in'
              )}
            </Button>
            <Button
              onClick={() => dispatch(logInWithGoogle())}
              color="error"
              variant="outlined"
              size="medium"
              sx={{ marginX: '0.5em' }}
              disabled={isLoading}
            >
              Google
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;

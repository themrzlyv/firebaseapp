import {
  Button,
  CardMedia,
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

import { authSelector } from '@src/services/selectors/authSelector';
import {
  logInWithGoogle,
  // registrationUser,
} from '@src/views/ui/Authentication/common/redux/Auth.Slice';

import { iRegistration } from '@src/views/ui/Authentication/common/@types';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import useFileUpload from '@src/services/hooks/useFileUpload';
import MultiSelect from '@src/components/MultiSelect';

const Registration: React.FC = () => {
  const { isLoading } = useSelector(authSelector);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { onFileChange, fileLoading, fileUrl } = useFileUpload();

  const options = [
    { value: 'web development', label: 'Web development' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full stack' },
    { value: 'mernstack', label: 'Mern Stack' },
  ];

  const [formValue, setFormValue] = useState<iRegistration>({
    email: '',
    fullname: '',
    password: '',
    photo: '',
    birthday: '',
    country: '',
    education: '',
    interests: [],
    job: '',
    verified: false,
    isAdmin: false,
    likedPosts: [],
    comments: [],
  });

  const dispatch = useDispatch();

  const handleSend = () => {
    // dispatch(registrationUser(formValue));
  };

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) return onFileChange(file);
  };

  console.log(formValue);

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
              autoComplete="false"
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
              autoComplete="false"
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
          <FormControl component="div" margin="normal" error size="medium" required>
            <TextField
              id="outlined-name"
              label="Name"
              value={formValue.fullname}
              variant="standard"
              onChange={(e) =>
                setFormValue((prevState) => ({ ...prevState, fullname: e.target.value }))
              }
            />
          </FormControl>
          <FormControl component="div" margin="normal" error size="medium" required>
            <TextField id="outlined-title" variant="standard" type="file" onChange={changeFile} />
          </FormControl>
          {fileLoading ? (
            <h4>Photo is uploading</h4>
          ) : (
            fileUrl && <CardMedia component="img" height="194" image={fileUrl} alt="Paella dish" />
          )}
          <FormControl component="div" margin="normal" error size="medium" required>
            <TextField
              type="date"
              variant="standard"
              value={formValue.birthday}
              onChange={({ target }) => {
                setFormValue((prevState) => ({ ...prevState, birthday: target.value }));
              }}
            />
          </FormControl>
          <FormControl component="div" margin="normal" error size="medium" required>
            <TextField
              id="outlined-name"
              label="Education"
              value={formValue.education}
              variant="standard"
              onChange={(e) =>
                setFormValue((prevState) => ({ ...prevState, education: e.target.value }))
              }
            />
          </FormControl>
          <FormControl component="div" margin="normal" error size="medium" required>
            <TextField
              id="outlined-name"
              label="Country"
              value={formValue.country}
              variant="standard"
              onChange={(e) =>
                setFormValue((prevState) => ({ ...prevState, country: e.target.value }))
              }
            />
          </FormControl>
          <FormControl component="div" margin="normal" error size="medium" required>
            <TextField
              id="outlined-name"
              label="Job"
              value={formValue.job}
              variant="standard"
              onChange={(e) => setFormValue((prevState) => ({ ...prevState, job: e.target.value }))}
            />
          </FormControl>

          <FormControl component="div" margin="normal" size="medium" required>
            <MultiSelect options={options} isSearchable isClearable />
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

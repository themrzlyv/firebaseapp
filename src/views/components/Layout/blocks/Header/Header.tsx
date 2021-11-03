import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useRouter } from '../../../../../services/hooks/useRouter';

import { authSelector } from '../../../../../services/selectors/authSelector';
import { logOutUser } from '../../../../ui/Authentication/common/redux/Auth.Slice';

import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface iProps {}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    color: 'white',
    borderColor: 'white',
    '&::before': {
      borderColor: 'white'
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid white'
    }
  },
  button: {
    color: 'white'
  }
}));

const Header: React.FC<iProps> = (): JSX.Element => {

  const classes = useStyles();

  const dispatch = useDispatch();

  const { push } = useRouter();

  const { currentUser, isLoading } = useSelector(authSelector);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="a"
          href="/"
          color="white"
          sx={{ flexGrow: 1, textDecoration: 'none' }}
        >
          Blog
        </Typography>
        <TextField
          id="input-with-icon-textfield"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton size="small" edge="end" className={classes.button}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            className: classes.input
          }}
        />
        {isLoading ? null : currentUser ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Typography onClick={() => push('/profile')}>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Typography onClick={() => dispatch(logOutUser())}>Log out</Typography>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => push('auth/login')}
            color="inherit"
          >
            <LoginIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

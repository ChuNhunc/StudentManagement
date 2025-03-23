// filepath: /d:/StudentManagement/StudentManagement/frontend/src/Layout/Navbar/index.tsx
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SMContext } from '../../context/context';
import { logout } from '../../service/authService';

type NavbarProps = {
  roleID: number;
}

const Navbar = ({roleID}: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Student Management
        </Typography>
        {roleID === 1 && (
          <>
            <Button color="inherit" onClick={() => navigate('/homepage', {state: {roleID}})}>Home</Button>
          </>
        )}
        {roleID === 2 && (
          <>
            <Button color="inherit" onClick={() => navigate('/homepage', {state: {roleID}})}>Home</Button>
          </>
        )}
        {roleID === 3 && (
          <>
            <Button color="inherit" onClick={() => navigate('/homepage', {state: {roleID}})}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/register', {state: {roleID}})}>Register</Button>
          </>
        )}
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
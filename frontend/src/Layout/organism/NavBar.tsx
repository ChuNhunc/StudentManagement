// filepath: /d:/StudentManagement/StudentManagement/frontend/src/Layout/Navbar/index.tsx
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { SMContext } from '../../context/context';
import { logout } from '../../service/authService';
import { NavItem, NavItemProps } from '../molecules/NavItem';
import { Logo } from '../atoms/photo';

type NavbarProps = {
  roleID: number;
}

const listNavForStudent: NavItemProps[] = [
  { title: "All class", icon: "home", route: "allclass" },
  { title: "My class", icon: "book", route: "myclass" },
  { title: "Task", icon: "task", route: "task" },
];

const listNavForTeacher: NavItemProps[] = [
  { title: "All course", icon: "home", route: "allcourse" },
  { title: "My course", icon: "book", route: "mycourse" },
  { title: "Task", icon: "task", route: "task" },
];

const listNavForAdmin: NavItemProps[] = [
  { title: "Account Management", icon: "account-management", route: "accountmanagement" },
  { title: "Student Management", icon: "student-management", route: "studentmanagement" },
  { title: "Class Management", icon: "class-management", route: "classmanagement" },
];

export const AdminNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

 
  return (
    <>
      <Box
        className="navbar"
        sx={{
          height: '100vh',
          width: '100px',
          textAlign: 'center',
          background: '#0000 linear-gradient(206deg, #fcfeff, #fff 8%, #eee6fb 30%, #f4f4fc 36%, #e9f4f5 72%, #bfcaff 90%, #a8cbe9) 0 0 no-repeat padding-box;',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box className='logo'>
          <Logo src='/images/logo.png' alt='logo'/>
        </Box>
        {listNavForAdmin.map((item, index) => {
          return (
            <>
              <NavItem 
                title={item.title} icon={item.icon} key={index}
                onClick={() => {
                  navigate(item.route || '/homepage')
                }}
              ></NavItem>
            </>
          )
        })}
      </Box>
    </>
  );
};

export const StudentNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  return (
    <>
      <Box
        className="navbar"
        sx={{
          height: '100vh',
          width: '100px',
          textAlign: 'center',
          background: '#0000 linear-gradient(206deg, #fcfeff, #fff 8%, #eee6fb 30%, #f4f4fc 36%, #e9f4f5 72%, #bfcaff 90%, #a8cbe9) 0 0 no-repeat padding-box;',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box className='logo'>
          <Logo src='logo.png' alt='logo'/>
        </Box>
        {listNavForStudent.map((item, index) => {
          return (
            <>
              <NavItem 
                title={item.title} icon={item.icon} key={index}
                onClick={() => {
                  navigate(item.route || '/student')
                }}
              ></NavItem>
            </>
          )
        })}
      </Box>
    </>
  );
}
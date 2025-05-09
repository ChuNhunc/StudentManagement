import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useContext, useState } from 'react';
import { login } from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import { SMContext } from '../../context/context';
import { ErrorText } from '../atoms/Typography';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blankError, setBlankError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
  const context = useContext(SMContext);

  function handleUsernameChange(event: any) {
    setUsername(event.target.value);
  }
  function handlePassChange(event: any) {
      setPassword(event.target.value);
  }
  async function handleLogin() {
    setBlankError(false);
    setLoginError(false);
    if(username === '' || password === '') {
      setBlankError(true);
      return;
    }
    try {
      const roleID = await login(username, password);
      if (roleID === 1) {
        const student = await context?.StudentStore.getById(username);
        console.log(student);
        context?.UserStore.saveUsserProfile(student);
        console.log(JSON.stringify(context?.UserStore.user))
        navigate('/student'); 
      }else if (roleID === 3) {
        navigate('/admin'); 
      }
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.data) {
        setLoginError(true); 
    } else {
        console.log("Unexpected error:", err);
    }
    }
  }
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Đăng nhập
        </Typography>
        <TextField
          label="Tên người dùng"
          id="username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange = {handleUsernameChange}
        />
        <TextField
          label="Mật khẩu"
          id="password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={handlePassChange}
        />
        <Box 
          className='auth-error'
          sx={{ width: '100%', display: loginError ? 'flex' : 'none', justifyContent: 'flex-start' }}>
          <ErrorText sx={{}}>Tên người dùng hoặc mật khẩu không đúng</ErrorText>
        </Box>
        <Box 
          className='blank-error'
          sx={{ width: '100%', display: blankError ? 'flex' : 'none', justifyContent: 'flex-start' }}>
          <ErrorText sx={{}}>Tên người dùng và mật khẩu không được để trống</ErrorText>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          style={{ marginTop: '16px' }}
          id="login-btn"
        >
          Đăng nhập
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
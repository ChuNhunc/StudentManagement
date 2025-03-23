import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useContext, useState } from 'react';
import { login } from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import { SMContext } from '../../context/context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const context = useContext(SMContext);

  function handleUsernameChange(event: any) {
    setUsername(event.target.value);
  }
  function handlePassChange(event: any) {
      setPassword(event.target.value);
  }
  async function handleLogin() {
    try {
      console.log(username, password);
      const roleID = await login(username, password);
      navigate('/homepage', { state: { roleID } });
    } catch (err: any) {
      alert(err.response?.data?.message);
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
// import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
// import { useState } from "react";
// import { register } from "../../service/authService";
// import { AdminTemplate } from "../template/MainTemplate";

// const RegisterPage = () => {
//     const [roleID, setRoleID] = useState<number>(1);
//     const [username, setUsername] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setUsername(e.target.value);
//     }
//     const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setPassword(e.target.value);
//     }
//     const onRoleIdChange = (e: SelectChangeEvent<number>) => {
//         setRoleID(parseInt(e.target.value.toString()));
//     }
//     const handleRegister = async () => {
//         try {
//             const response = await register(username, password, roleID);
//             alert("Tạo tài khoản thành công");
//         } catch (err: any) {
//             const errorMessage = err.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
//             console.log(errorMessage);
//             alert(errorMessage);
//         }
//     }
//     return (
//         <AdminTemplate>
//             <Container
//                 sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     height: '100vh'
//                 }}
//             >
//             <Typography 
//                 variant="h4" 
//                 component="h1" 
//                 gutterBottom
//                 sx={{
//                     marginTop: '50px',
//                 }}
//             >
//                 Tạo tài khoản
//                 </Typography>
//                 <TextField
//                 label="Tên người dùng"
//                 variant="outlined"
//                 margin="normal"
//                 sx={{
//                     width: '60%',

//                 }}
//                 value={username}
//                 onChange={onUsernameChange}
//                 />
//                 <TextField
//                 label="Mật khẩu"
//                 type="password"
//                 variant="outlined"
//                 margin="normal"
//                 value={password}
//                 onChange={onPasswordChange}
//                 sx={{
//                     width: '60%',
//                     marginTop: '16px'
//                 }}
//                 />
//                 <FormControl variant="outlined" 
//                     sx={{ 
//                         width: '60%', 
//                         marginTop: '16px'
//                     }}>
//                     <InputLabel id="demo-simple-select-label">Age</InputLabel>
//                     <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         // value={roleID}
//                         label="Vai trò"
//                         onChange={onRoleIdChange}
//                     >
//                         <MenuItem value={1}>Học sinh</MenuItem>
//                         <MenuItem value={2}>Giáo viên</MenuItem>
//                         <MenuItem value={3}>Quản lý học viên</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleRegister}
//                 sx={{
//                     width: '60%',
//                     marginTop: '16px'
//                 }}
//                 style={{ marginTop: '16px' }}
//                 >
//                 Tạo tài khoản
//                 </Button>
//             </Container>
//         </AdminTemplate>
//     )
// }

// export default RegisterPage;

export {}
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './Layout/page/Login';
import HomePage from './Layout/page/HomePage';
import RegisterPage from './Layout/page/CreateAccountPage';
import { HeaderText } from './Layout/molecules/HeaderText';
import { Header } from './Layout/organism/Header';

function App() {
  return (
    <>
      {/* <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/register' element= {<RegisterPage/>}/>
      </Routes> */}
      <Header/>
    </>
  );
}

export default App;

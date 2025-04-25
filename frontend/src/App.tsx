import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Login from './Layout/page/Login';
import { StudentHomePage } from './Layout/page/HomePage';
import RegisterPage from './Layout/page/CreateAccountPage';
import { AddClassForm } from './Layout/organism/ClassManagement/AddClassForm';
import { ClassManagement } from './Layout/organism/ClassManagement/ClassManagement';
import { StudentManagement } from './Layout/organism/StudentManagement/StudentManagement';
import { AddStudentForm } from './Layout/organism/StudentManagement/AddStudentForm';
import { ClassDetail } from './Layout/organism/ClassManagement/ClassDetail/ClassDetail';
import { AccountManagement, StudentAccountManagement, TeacherAccountManagement } from './Layout/organism/AccountManagement/AccountManagement';
import { SelectItem } from './Layout/molecules/SelectItem';
import { ApplicationList } from './Layout/organism/ClassManagement/ClassDetail/ApplicationList';
import { ApplicationTable } from './Layout/molecules/Table';
import {AdminHomePage} from './Layout/page/HomePage';
import {  MainPage } from './Layout/page/MainPage';
import { ClassCard } from './Layout/molecules/ClassCard';
import { AllClass } from './Layout/organism/AllClass/AllClass';
import { StudentClassDetail } from './Layout/organism/AllClass/ClassDetail';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path='/admin' element={<AdminHomePage />}>
          <Route path='classmanagement' element={<MainPage />}>
            <Route index element={<ClassManagement />} />
            <Route path='createclass' element={<AddClassForm></AddClassForm>}></Route>
            <Route path=':classID' element={<ClassDetail/>}>
              <Route path='generalinformation' element={<ApplicationList/>}></Route>
              <Route path='applicationlist' element={<ApplicationTable/>}></Route>
              <Route path='enrollmentlist' element={<ApplicationList/>}></Route>
              <Route path='lessonlist' element={<ApplicationList/>}></Route>
              <Route path='classschedule' element={<ApplicationList/>}></Route>
            </Route>
          </Route>
          <Route path='studentmanagement' element={<MainPage />}>
            <Route index element={<StudentManagement/>} />
            <Route path='createstudent' element={<AddStudentForm />}></Route>
          </Route>
          <Route path='accountmanagement' element={<MainPage />}>
            <Route index element={<AccountManagement/>} />
            <Route path='studentaccount' element={<StudentAccountManagement />}></Route>
            <Route path='adminaccount' element={<TeacherAccountManagement />}></Route>
            <Route path='teacheraccount' element={<TeacherAccountManagement />}></Route>
          </Route>
        </Route>
        <Route path='/student' element={<StudentHomePage />}>
          <Route path='allclass' element={<AllClass />}></Route>
          <Route path='allclass/:classID' element={<StudentClassDetail />}></Route>
          <Route path=':classID' element={<StudentClassDetail />}></Route>
          <Route path='myclass' element={<MainPage />}>
          </Route>
          <Route path='task' element={<MainPage />}></Route>
        </Route>
        <Route path='/register' element= {<RegisterPage/>}/>
      </Routes>
      </LocalizationProvider>
    </>
  );
}

export default App;

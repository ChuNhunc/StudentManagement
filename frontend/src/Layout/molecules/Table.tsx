import { Box } from "@mui/material"

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { SMContext } from "../../context/context";
import { Class } from "../../data/ClassStore";
import { Link, useParams } from "react-router-dom";
import { Student } from "../../data/StudentStore";
import { generateStudentAccount } from "../../service/authService";
import AccountStore, { Account } from "../../data/AccountStore";
import { AccountTableAction, StudentTableAction } from "./TableAction";
import App from "../../App";
import ApplicationStore from "../../data/ApplicationStore";
import { observer } from "mobx-react-lite";
import { Text } from "../atoms/Typography";

type ClassTable = {
  ClassID: string;
  Course: string;
  TeacherID: string;
  ClassName: string;
  StudentNumber: number;
  StartDate: Date | null;
  EndDate: Date | null;
}

const classColumns: GridColDef[] = [
  { field: 'ClassID', headerName: 'ClassID', width: 130 },
  {
    field: 'ClassName',
    headerName: 'Class Name',
    type: 'string',
    width: 150,
    renderCell: (params) => (
      <Link to={`/classmanagement/${params.row.ClassID}`} 
        style={{ 
          textDecoration: 'none', 
          color: '#0035ffd1', 
          fontWeight: 'bold',
          
        }}>
        {params.value}
      </Link>
    ),
  },
  { field: 'Course', headerName: 'Course', width: 130 },
  { field: 'TeacherID', headerName: 'Teacher', width: 130 },
  {
    field: 'StudentNumber',
    headerName: 'Student number',
    type: 'number',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
  },
  {
    field: 'StartDate',
    headerName: 'Start Date',
    type: 'date',
    width: 130,
  },
  {
    field: 'EndDate',
    headerName: 'End Date',
    type: 'date',
    width: 130,
  }
];

const paginationModel = { page: 0, pageSize: 5 };


export const ClassTable = () => {
  const context = React.useContext(SMContext);
  const [rows, setRows] = React.useState<ClassTable[]>([]);
  const useEffect = React.useEffect(() => {
    const fetchData = async () => {
      try {
        await context?.CourseStore.getAll();
        const courseMap = new Map(
          context?.CourseStore.courses.map((course) => [course.CourseID, course.CourseName])
        );

        await context?.TeacherStore.getAll();
        const teacherMap = new Map(
          context?.TeacherStore.teachers.map((teacher) => [teacher.TeacherID, teacher.FullName])
        );

        await context?.ClassStore.getAll();
        const fetchedRows = context?.ClassStore.classes.map((item) => ({
            ClassID: item.ClassID,
            Course : courseMap.get(item.CourseID) || "Unknown",
            TeacherID: teacherMap.get(item.TeacherID) || "Unknown",
            ClassName: item.ClassName,
            StudentNumber: item.StudentNumber,
            StartDate: new Date(item.StartDate || ''), 
            EndDate: new Date(item.EndDate || ''),
        }));
        setRows(fetchedRows || []); // Cập nhật state rows
      } catch (error) {
          console.error("Failed to fetch classes:", error);
      }
    };
  fetchData();
  },[context?.ClassStore.classes.length])
    return (
        <>
            <Paper sx={{ height: 400, width: '90%', margin: 'auto' }}>
            <DataGrid
                rows={rows}
                getRowId={(row) => row.ClassID}
                columns={classColumns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
            </Paper>
        </>
    )
}

const  handleButtonClick = async (row: Student) => {
  const account = await generateStudentAccount(row);
  alert("Tạo tài khoản thành công" + account);
}


const studentColumn: GridColDef[] = [
  { field: 'StudentID', headerName: 'StudentID', width: 130 },
  {
    field: 'FullName',
    headerName: 'FullName',
    type: 'string',
    width: 150,
    renderCell: (params) => (
      <Link to={`/class/${params.row.ClassID}`} 
        style={{ 
          textDecoration: 'none', 
          color: '#0035ffd1', 
          fontWeight: 'bold',
          
        }}>
        {params.value}
      </Link>
    ),
  },
  { field: 'DateOfBirth', headerName: 'DateOfBirth', type: 'date', width: 130 },
  { field: 'Email', headerName: 'Email', width: 170 },
  {
    field: 'PhoneNumber',
    headerName: 'PhoneNumber',
    type: 'string',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
  },
  {
    field: 'Address',
    headerName: 'Start Date',
    type: 'string',
    width: 150,
  },
  {
    field: 'Actions', // Tên cột
    headerName: 'Generate Account',
    width: 150,
    renderCell: (params) => (
      <Box>
        <StudentTableAction 
          onClick={() => handleButtonClick(params.row)}
        >
          Generate Account
        </StudentTableAction>
      </Box>
    ),
  },
];


export const StudentTable = () => {
  const context = React.useContext(SMContext);
  const [rows, setRows] = React.useState<Student[]>([]);
  const useEffect = React.useEffect(() => {
    const fetchData = async () => {
      try {
          await context?.StudentStore.getAll();
          const fetchedRows = context?.StudentStore.student.map((item) => ({
              StudentID: item.StudentID,
              FullName: item.FullName,
              DateOfBirth: new Date(item.DateOfBirth || ''), 
              Email: item.Email,
              PhoneNumber: item.PhoneNumber,
              Address: item.Address,
              AccountID: item.AccountID,
          }));
          setRows(fetchedRows || []); // Cập nhật state rows
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };
  fetchData();
  },[context?.StudentStore.student.length])
    return (
        <>
            <Paper sx={{ height: 400, width: '90%', margin: 'auto' }}>
            <DataGrid
                rows={rows}
                getRowId={(row) => row.StudentID}
                columns={studentColumn}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
            </Paper>
        </>
    )
}

const AccountColumn: GridColDef[] = [
  {field: 'Name', headerName: 'Name', width: 400},
  {field: 'Username', headerName: 'Username', width: 250},
  {field: 'Create At', headerName: 'Create At', width: 200, type: 'date'},
  {
    field: 'Actions', // Tên cột
    headerName: '',
    width: 150,
    renderCell: (params) => (
      <AccountTableAction 
        onClick={() => handleButtonClick(params.row)}
      >
        Details
      </AccountTableAction>
    ),
  },
];

type AccountTableProps = {
  type: 'student' | 'teacher'
}

type AccountTable = {
  Name: string;
  Username: string;
  CreateAt: Date | null;
}

export const AccountTable = ({type}: AccountTableProps) => {
  const context = React.useContext(SMContext);
  const [rows, setRows] = React.useState<AccountTable[]>([]);
  const useEffect = React.useEffect(() => {
  const fetchData = async () => {
    try {
        if(type === 'teacher') {
          await context?.AccountStore.getTeacherAccount();
          console.log(context?.AccountStore.account);
          await context?.TeacherStore.getAll();
          const teacherMap = new Map(
            context?.TeacherStore.teachers.map((teacher) => [teacher.AccountID, teacher.FullName])
          );
          const fetchedRows = context?.AccountStore.account.map((item) => ({
            Name: teacherMap.get(item.AccountID) || "Unknown",
            Username: item.Username,
            CreateAt: new Date(item.CreatedAt || ''),
          }));
          setRows(fetchedRows || []);
        }else {
          await context?.AccountStore.getStudentAccount();
          console.log(context?.AccountStore.account);
          await context?.StudentStore.getAll();
          const studentMap = new Map(
            context?.StudentStore.student.map((student) => [student.AccountID, student.FullName])
          );
          const fetchedRows = context?.AccountStore.account.map((item) => ({
            Name: studentMap.get(item.AccountID) || "Unknown",
            Username: item.Username,
            CreateAt: new Date(item.CreatedAt || ''),
          }));
          setRows(fetchedRows || []);
        }
      } catch (error) {
          console.error("Failed to fetch classes:", error);
      }
  };
fetchData();
},[context?.StudentStore.student.length])
  return (
      <>
          <Paper sx={{ height: 400, width: '90%', margin: 'auto' }}>
          <DataGrid
              rows={rows}
              getRowId={(row) => row.Username}
              columns={AccountColumn}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
          />
          </Paper>
      </>
  )
}

const HandleApproved = async (
  row: ApplicationTable,
  setRows: React.Dispatch<React.SetStateAction<ApplicationTable[]>>,
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log("Approved", row);
  const applicationID = row.ApplicationID.trim();
  console.log("ApplicationID+", applicationID);
  const modifiedDate = new Date();
  const statusID = 3; // Approved
  const remarks = "Approved";
  try {
    const newRow = await ApplicationStore.updateApplication(applicationID, statusID, remarks);
    setRows((prevRows) =>
      prevRows.map((r) =>
          r.ApplicationID === applicationID
              ? { ...r, Status: "Approved", ModifiedDate: new Date() }
              : r
      )
    );
    setDisplay(false)
  } catch (error) {
      console.error("Error updating application:", error);
  }
}

const HandleReject = async (
  row: ApplicationTable,
  setRows: React.Dispatch<React.SetStateAction<ApplicationTable[]>>,
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log("Approved", row);
  const applicationID = row.ApplicationID.trim();
  console.log("ApplicationID+", applicationID);
  const modifiedDate = new Date();
  const statusID = 2; 
  const remarks = "Approved";
  try {
    const newRow = await ApplicationStore.updateApplication(applicationID, statusID, remarks);
    setRows((prevRows) =>
      prevRows.map((r) =>
          r.ApplicationID === applicationID
              ? { ...r, Status: "Rejected", ModifiedDate: new Date() }
              : r
      )
    );
    setDisplay(false)
  } catch (error) {
      console.error("Error updating application:", error);
  }
}


type ApplicationTable = {
  ApplicationID: string;
  Status: string;
  StudentName: string;
  ApplicationDate: Date | null;
  ModifiedDate: Date | null;
}

export const ApplicationTable = observer(() => {
  const [display, setDisplay] = React.useState(true);
  const { classID } = useParams<{ classID: string }>();
  const context = React.useContext(SMContext);
  const [rows, setRows] = React.useState<ApplicationTable[]>([]);
  //column
  const ApplicationColumn: GridColDef[] = [
    { field: 'empty', headerName: '', width: 50, minWidth: 10, maxWidth: 10, sortable: false, filterable: false },
    {field: 'ApplicationID', headerName: 'ApplicationID', width: 160},
    {field: 'StudentName', headerName: 'Student Name', width: 150},
    {field: 'Status', headerName: 'Status', width: 130},
    {field: 'ApplicationDate', headerName: 'Application Date', width: 130, type: 'date'},
    {field: 'ModifiedDate', headerName: 'Modified Date', width: 130, type: 'date'},
    {
      field: 'Actions', // Tên cột
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <Box sx={{alignItems: 'center',justifyContent: 'center', display: 'flex', gap: '10px', width: '100%',height: '100%'}}>
          <AccountTableAction 
            onClick={() => HandleApproved(params.row, setRows, setDisplay)}
            sx={{
              fontSize: '10px', backgroundColor: '#1976d2', color: '#fff',
              display: params.row.Status === "Pending" ? 'block' : 'none',
            }}
          >
            Approved
          </AccountTableAction>
          <AccountTableAction 
            onClick={() => HandleReject(params.row, setRows, setDisplay)}
            sx={{
              fontSize: '10px', backgroundColor: '#ff0000', color: '#fff', 
              display: params.row.Status === "Pending" ? 'block' : 'none',
            }}
          >
            Reject
          </AccountTableAction>
          <Box 
            sx={{
              backgroundColor: params.row.Status === "Approved" ? "#4caf50" : params.row.Status === "Rejected" ? "#f44336" : "#ffeb3b",
              display: params.row.Status === "Pending" ? 'none' : 'block',
              color: "#fff",
              padding: "5px",
              borderRadius: "4px",
              textAlign: "center",
              width: '70%',
              height: '35px'
            }}
          >
            <Text sx={{color: 'white'}}>{params.row.Status}</Text>
          </Box>
      </Box>
        
      ),
    },
  ];

  const useEffect = React.useEffect(() => {
  const fetchData = async () => {
    try {
      await context?.ApplicationStore.getAllApplication(classID || '');
      await context?.StudentStore.getAll();
      await context?.StatusStore.getAllStatus();
      const statusMap = new Map(
        context?.StatusStore.status.map((status) => [status.StatusID, status.Status])
      );

      const studentMap = new Map(
        context?.StudentStore.student.map((student) => [student.StudentID, student.FullName])
      );
      const fetchedRows = context?.ApplicationStore.applications.map((item) => (
        {
          ApplicationID: item.ApplicationID,
          StudentName: studentMap.get(item.StudentID)?.trim() || "Unknown",
          Status: statusMap.get(Number(item.StatusID)) || "",
          ApplicationDate: new Date(item.ApplicationDate || ''),
          ModifiedDate: new Date(item.ModifiedDate || ''),
        }
    ));
      setRows(fetchedRows || []);
      } catch (error) {
          console.error("Failed to fetch classes:", error);
      }
  };
  fetchData();
},[context?.ApplicationStore.applications.length])
  return (
      <>
          <Paper sx={{ height: 480, width: '95%', margin: 'auto', marginTop: '20px' }}>
          <DataGrid
              rows={rows}
              getRowId={(row) => row.ApplicationID}
              columns={ApplicationColumn}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              disableColumnResize={false}
              sx={{ border: 0 }}
          />
          </Paper>
      </>
  )
})
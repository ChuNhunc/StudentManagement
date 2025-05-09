import { Box } from "@mui/material"

import * as React from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
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
import { Teacher } from "../../data/TeacherStore";



const classColumns: GridColDef[] = [
  { field: 'ClassID', headerName: 'ClassID', flex: 1.2 },
  {
    field: 'ClassName',
    headerName: 'Class Name',
    type: 'string',
    flex: 1,
    renderCell: (params) => (
      <Link to={`/admin/classmanagement/${params.row.ClassID}`} 
        style={{ 
          textDecoration: 'none', 
          color: '#0035ffd1', 
          fontWeight: 'bold',
          
        }}>
        {params.value}
      </Link>
    ),
  },
  { field: 'Course', headerName: 'Course', flex: 1 },
  { field: 'Teacher', headerName: 'Teacher', flex: 1 },
  {
    field: 'StudentNumber',
    headerName: 'Student number',
    type: 'number',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 0.8,
  },
  {
    field: 'StartDate',
    headerName: 'Start Date',
    type: 'date',
    flex: 1,
  },
  {
    field: 'EndDate',
    headerName: 'End Date',
    type: 'date',
    flex: 1,
  }
];

const paginationModel = { page: 0, pageSize: 5 };

export type ClassTable = {
  ClassID: string;
  Course: string;
  Teacher: string;
  ClassName: string;
  StudentNumber: number;
  StartDate: Date | null;
  EndDate: Date | null;
}

type ClassTableProps = {
  rows: ClassTable[];
  columns?: GridColDef[];
  onSelectionModelChange?: (newSelection: GridRowSelectionModel) => void;
}

export const ClassTable = ({rows, columns, onSelectionModelChange}: ClassTableProps) => {
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
                onRowSelectionModelChange={onSelectionModelChange}
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




type StudentTableProps = {
  rows: Student[];
  columns?: GridColDef[];
  onSelectionModelChange?: (newSelection: GridRowSelectionModel) => void;
}

export const StudentTable = observer(({rows, columns, onSelectionModelChange}: StudentTableProps) => {
    return (
        <>
            <Paper sx={{ height: 400, width: '90%', margin: 'auto' }}>
            <DataGrid
                rows={rows}
                getRowId={(row) => row.StudentID}
                columns={columns || []}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                onRowSelectionModelChange={onSelectionModelChange}
            />
            </Paper>
        </>
    )
})

const AccountColumn: GridColDef[] = [
  {field: 'Name', headerName: 'Name', flex: 2},
  {field: 'Username', headerName: 'Username', flex: 2},
  {field: 'Create At', headerName: 'Create At', flex: 1, type: 'date'},
  {
    field: 'Actions', // Tên cột
    headerName: '',
    flex: 1,
    renderCell: (params) => (
      <AccountTableAction 
        onClick={() => handleButtonClick(params.row)}
      >
        Details
      </AccountTableAction>
    ),
  },
];

export type AccountTableProps = {
  rows: AccountTable[];
}

export type AccountTable = {
  Name: string;
  Username: string;
  CreateAt: Date | null;
}

export const AccountTable = observer(({rows}: AccountTableProps) => {
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
})

const HandleApproved = async (
  row: ApplicationTable,
  setRows: React.Dispatch<React.SetStateAction<ApplicationTable[]>>,
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log("Approved", row);
  const applicationID = row.ApplicationID.trim();
  console.log("ApplicationID+", applicationID);
  const modifiedDate = new Date();
  const statusID = 3;
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


export type ApplicationTable = {
  ApplicationID: string;
  Status: string;
  StudentName: string;
  ApplicationDate: Date | null;
  ModifiedDate: Date | null;
}

export type ApplicationTableProps = {
  rows: ApplicationTable[];
  setRows: React.Dispatch<React.SetStateAction<ApplicationTable[]>>;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectionModelChange?: (newSelection: GridRowSelectionModel) => void;
}

export const ApplicationTable = observer(({rows, setRows, setDisplay, onSelectionModelChange}: ApplicationTableProps) => {
  //column
  const ApplicationColumn: GridColDef[] = [
    {field: 'ApplicationID', headerName: 'ApplicationID', flex: 1},
    {field: 'StudentName', headerName: 'Student Name', flex: 1},
    {field: 'Status', headerName: 'Status', flex: 1},
    {field: 'ApplicationDate', headerName: 'Application Date', flex: 1, type: 'date'},
    {field: 'ModifiedDate', headerName: 'Modified Date', flex: 1, type: 'date'},
    {
      field: 'Actions', // Tên cột
      headerName: '',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{alignItems: 'center',justifyContent: 'center', display: 'flex', gap: '5px', width: '100%',height: '100%'}}>
          <AccountTableAction 
            onClick={() => HandleApproved(params.row, setRows, setDisplay)}
            sx={{
              fontSize: '8px', backgroundColor: '#1976d2', color: '#fff',
              display: params.row.Status === "Pending" ? 'block' : 'none',
            }}
          >
            Approved
          </AccountTableAction>
          <AccountTableAction 
            onClick={() => HandleReject(params.row, setRows, setDisplay)}
            sx={{
              fontSize: '8px', backgroundColor: '#ff0000', color: '#fff', 
              display: params.row.Status === "Pending" ? 'block' : 'none',
            }}
          >
            Rejected
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
  return (
      <>
          <Paper sx={{ height: 400, width: '98%', margin: 'auto', marginTop: '10px' }}>
          <DataGrid
              rows={rows}
              getRowId={(row) => row.ApplicationID}
              columns={ApplicationColumn}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              disableColumnResize={false}
              onRowSelectionModelChange={onSelectionModelChange}
              checkboxSelection
              sx={{ border: 0 }}
          />
          </Paper>
      </>
  )
})

type TeacherTableProps = {
  rows: Teacher[];
  columns?: GridColDef[];
  onSelectionModelChange?: (newSelection: GridRowSelectionModel) => void;
}

export type TeacherTable = {
  TeacherID: string;
  FullName: string;
  Email: string;
  PhoneNumber: string;
  Introduction: string;
}

export const TeacherTable = observer(({rows, columns, onSelectionModelChange}: TeacherTableProps) => {
  return (
      <>
          <Paper sx={{ height: 400, width: '90%', margin: 'auto' }}>
          <DataGrid
              rows={rows}
              getRowId={(row) => row.TeacherID}
              columns={columns || []}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onRowSelectionModelChange={onSelectionModelChange}
              sx={{ border: 0 }}
          />
          </Paper>
      </>
  )
})
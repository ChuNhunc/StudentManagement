import { Box, Button, TextField } from "@mui/material"
import { ToolBox } from "../../molecules/ToolBox"
import { StudentTable } from "../../molecules/Table"
import React, { useState } from "react";
import { SMContext } from "../../../context/context";
import { Student } from "../../../data/StudentStore";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { StudentTableAction } from "../../molecules/TableAction";
import { generateStudentAccount } from "../../../service/authService";
import { CreateButton } from "../../atoms/button";
import { Icon } from "../../atoms/icon";



export const StudentManagement = () => {
    const navigate = useNavigate()
    const context = React.useContext(SMContext);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]); 
    const [searchText, setSearchText] = React.useState<string>("")
    const [rows, setRows] = React.useState<Student[]>([]);
    const [originalRows, setOriginalRows] = React.useState<Student[]>([]);

    const [hasAccount, setHasAccount] = React.useState(false);

    const  handleButtonClick = async (row: Student) => {
        const account = await generateStudentAccount(row);
          if (!account) {
              alert("Tạo tài khoản thất bại");
              return;
          }
          setHasAccount(true);
        alert("Tạo tài khoản thành công" + account);
      }
    
    const studentColumn: GridColDef[] = [
        { field: 'StudentID', headerName: 'StudentID', flex: 1 },
        {
        field: 'FullName',
        headerName: 'FullName',
        type: 'string',
        flex: 1,
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
        { field: 'DateOfBirth', headerName: 'DateOfBirth', type: 'date', flex: 1 },
        { field: 'Email', headerName: 'Email', flex: 1 },
        {
        field: 'PhoneNumber',
        headerName: 'PhoneNumber',
        type: 'string',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        },
        {
        field: 'Address',
        headerName: 'Address',
        type: 'string',
        flex: 1,
        },
        {
        field: 'Actions', // Tên cột
        headerName: 'Generate Account',
        flex: 1,
        renderCell: (params) => {
            const setAction = async () => {
                const accountID = await context?.StudentStore.getById(params.row.StudentID);
                if (accountID) {
                    setHasAccount(true);

                } else {
                    setHasAccount(false);
                }
            };
            return (
                <>
                    <Box>
                    {params.row.hasAccount ? (
                            <StudentTableAction
                            sx={{
                                color: '#1976d2', 
                                backgroundColor: '#fff',
                                border: '1px solid #1976d2',
                            }}
                                onClick={() => alert(`Account ID: ${params.row.AccountID}`)}
                            >
                                See Account
                            </StudentTableAction>
                        ) : (
                            <StudentTableAction
                                onClick={async () => {
                                    await handleButtonClick(params.row);
                                    setRows((prevRows) =>
                                        prevRows.map((row) =>
                                            row.StudentID === params.row.StudentID
                                                ? { ...row, AccountID: parseInt("newAccountID", 10), hasAccount: true } // Chuyển đổi chuỗi thành số
                                                : row
                                        )
                                    );
                                }}
                            >
                                Generate Account
                            </StudentTableAction>
                        )}    
                    </Box>
                </>
            )
        }
        },
    ];

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
              hasAccount: !!item.AccountID,
          }));
          setRows(fetchedRows || []);
          setOriginalRows(fetchedRows || []);
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };
  fetchData();
  },[context?.StudentStore.student.length])

    const handleSearch = () => {
        const filteredRows = originalRows.filter((item) => {
            return item.FullName.toLowerCase().includes(searchText.toLowerCase())
        })
        setRows(filteredRows || [])
    }   

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedRows(selectionModel); 
    };

    return (
        <>
            <Box 
                className = 'tool-box'
                sx={{
                    width: '100%',
                    height: '80px',
                    display: 'inline-block',
                    marginTop: '20px',
                }}
            >
                <CreateButton 
                    sx={{marginLeft: '30px'}}
                    onClick={() => {
                        navigate('createstudent')
                    }}
                >Add</CreateButton>
                <Button  
                    disabled={
                        selectedRows.length !== 1 
                    }
                    sx={{}}
                    onClick={() => {
                        const selectedRow = rows.find((row) => row.StudentID === selectedRows[0]);
                        if (selectedRow) {
                            navigate(`/admin/studentmanagement/editstudent`,{state: selectedRow})
                            console.log(selectedRow)
                        }
                    }}
                >
                    Edit
                </Button>
                <Box 
                    className='search-box'
                    sx={{
                        width: '20%',
                        float: 'right',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginRight: '30px',
                    }}
                >
                    <>
                        <TextField
                        id="search-bar"
                        className="text"
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                handleSearch()
                            }
                        }}
                        variant="outlined"
                        placeholder="Search..."
                        size="small"
                        />
                        <Box
                        onClick={handleSearch}
                        >
                        <Icon name='search' sx={{cursor: 'pointer'}}></Icon>
                    </Box>
                    </>
                </Box>
            </Box>
            <Box className='table'>
                <StudentTable rows={rows} columns={studentColumn} onSelectionModelChange={handleSelectionChange}/>
            </Box>
        </>
    )
}
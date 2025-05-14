import React, { useState } from "react";
import { Student } from "../../../data/StudentStore";
import { SMContext } from "../../../context/context";
import { generateTeacherAccount } from "../../../service/authService";
import { Teacher } from "../../../data/TeacherStore";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { StudentTableAction } from "../../molecules/TableAction";
import { ToolBox } from "../../molecules/ToolBox";
import { StudentTable, TeacherTable } from "../../molecules/Table";
import { CreateButton } from "../../atoms/button";
import { Icon } from "../../atoms/icon";

export const TeacherManagement = () => {
    const navigate = useNavigate()
    const context = React.useContext(SMContext);
    const [searchText, setSearchText] = useState<string>("")
    const [rows, setRows] = React.useState<Teacher[]>([]);
    const [originalRows, setOriginalRows] = React.useState<Teacher[]>([]);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]); 

    const [hasAccount, setHasAccount] = React.useState(false);

    const  handleButtonClick = async (row: Teacher) => {
        const account = await generateTeacherAccount(row);
          if (!account) {
              alert("Tạo tài khoản thất bại");
              return;
          }
          setHasAccount(true);
        alert("Tạo tài khoản thành công" + account);
      }

     const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
            setSelectedRows(selectionModel); 
        };
    
    const teacherColumn: GridColDef[] = [
        { field: 'TeacherID', headerName: 'TeacherID', flex: 1 },
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
        field: 'Introduction',
        headerName: 'Introduction',
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
                                            row.TeacherID === params.row.TeacherID
                                                ? { ...row, AccountID: parseInt("newAccountID", 10), hasAccount: true } 
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
              await context?.TeacherStore.getAll();
              const fetchedRows = context?.TeacherStore.teachers.map((item) => ({
                  TeacherID: item.TeacherID,
                  FullName: item.FullName,
                  Email: item.Email,
                  PhoneNumber: item.PhoneNumber,
                  Introduction: item.Introduction,
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

    return (
        <>
            <>
                {/* <Box>
                    <ToolBox 
                        route="createteacher"
                        onChange={(e) => {
                            setSearchText(e.target.value)
                        }}
                        onClick={handleSearch}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') {
                                // handleSearch()
                            }
                        }}
                    />
                </Box> */}
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
                            navigate('createteacher')
                        }}
                    >Add</CreateButton>
                    <Button  
                        disabled={
                            selectedRows.length !== 1 
                        }
                        sx={{}}
                        onClick={() => {
                            const selectedRow = rows.find((row) => row.TeacherID === selectedRows[0]);
                            if (selectedRow) {
                                navigate(`/admin/teachermanagement/editteacher`,{state: selectedRow})
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
                    <TeacherTable rows={rows} columns={teacherColumn} onSelectionModelChange={handleSelectionChange}/>
                </Box>
            </>
        </>
    )
}
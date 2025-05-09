import React, { useState } from "react";
import ApplicationStore from "../../../../data/ApplicationStore";
import { ApplicationTable } from "../../../molecules/Table";
import { useParams } from "react-router-dom";
import { SMContext } from "../../../../context/context";
import { ToolBox } from "../../../molecules/ToolBox";
import { Box, Button } from "@mui/material";
import { SearchBox } from "../../../molecules/InputForm";
import { GridOverlay, GridRowSelectionModel } from "@mui/x-data-grid";
import { Text } from "../../../atoms/Typography";


export const ApplicationList = () => {
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]); 
    const [display, setDisplay] = React.useState(true);
    const { classID } = useParams<{ classID: string }>();
    const [searchText, setSearchText] = React.useState<string>("")
    const [originalRows, setOriginalRows] = React.useState<ApplicationTable[]>([]);
    const context = React.useContext(SMContext);
    const [rows, setRows] = React.useState<ApplicationTable[]>([]);
    const [reverseEnable, setReverseEnable] = React.useState(false);

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
      setOriginalRows(fetchedRows || []);
      } catch (error) {
          console.error("Failed to fetch classes:", error);
      }
  };
    fetchData();
    },[context?.ApplicationStore.applications?.length])

    const handleSearch = () => {
        const filteredRows = originalRows.filter((item) => {
            return item.StudentName.toLowerCase().includes(searchText.toLowerCase())
        })
        setRows(filteredRows || [])
    }

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        setSelectedRows(selectionModel); 
    };

    const HandleReverseStatus = async (
      row: ApplicationTable,
      setRows: React.Dispatch<React.SetStateAction<ApplicationTable[]>>,
    ) => {
      console.log("Row", row);
      const applicationID = row.ApplicationID.trim();
      const application = await context?.ApplicationStore.getApplicationByID(applicationID);
      if(application.StatusID === 2) {
        const statusID = 3;
        const remarks = null;
        try {
          const updatedApplication = await context?.ApplicationStore.updateApplication(applicationID, statusID, remarks);
          if (updatedApplication) {
            setRows((prevRows) =>
              prevRows.map((r) =>
                  r.ApplicationID === applicationID
                      ? { ...r, Status: "Approved", ModifiedDate: new Date() }
                      : r
              )
            );
          }
        } catch (error) {
            console.error("Error updating application:", error);
        }
      }else if(application.StatusID === 3) {
        const statusID = 2;
        const remarks = null;
        try {
          const updatedApplication = await context?.ApplicationStore.updateApplication(applicationID, statusID, remarks);
          
          if (updatedApplication) {
            setRows((prevRows) =>
              prevRows.map((r) =>
                  r.ApplicationID === applicationID
                      ? { ...r, Status: "Rejected", ModifiedDate: new Date() }
                      : r
              )
            );
          }
        } catch (error) {
            console.error("Error updating application:", error);
        }
      }
    }

    return (
        <>
            <Box sx={{paddingTop:'20px'}}>
                <Box>
                    <Box 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            gap: '10px',
                            marginRight: '30px',
                        }}
                        className='search-box'
                    >
                        <Button  
                          disabled={
                            selectedRows.length !== 1 || 
                            !rows.find((row) => row.ApplicationID === selectedRows[0] && 
                                (row.Status === "Rejected" || row.Status === "Approved")) 
                          }
                          sx={{float: 'left'}}
                          onClick={() => {
                            const selectedRow = rows.find((row) => row.ApplicationID === selectedRows[0]);
                            if (selectedRow) {
                                HandleReverseStatus(selectedRow, setRows);
                            }
                          }}
                        >
                            Reverse status
                        </Button>
                        <SearchBox
                            onChange={(e) => {
                                setSearchText(e.target.value)
                            }}
                            onClick={handleSearch}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                if (e.key === 'Enter') {
                                    handleSearch()
                                }
                            }}
                        />
                    </Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    paddingTop: '20px',
                }}>
                    <ApplicationTable 
                        setRows={setRows} 
                        setDisplay={setDisplay} 
                        rows={rows}
                        onSelectionModelChange={handleSelectionChange}
                    />
                </Box>
            </Box>
        </>
    )
}

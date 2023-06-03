import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Stack, Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const USERTYPE = {
  MENUFECTURE :"Menufecture",
  TRANSPORTER : "Transporter"
}
export default function DataGrid({ data, addOrderButton }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [UserType,setUserType] = useState()
  const router = useRouter();
  const [userData , setUserData] = useState()
  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
    if (userDataCookie) {
      const userDataValue = JSON.parse(userDataCookie);
      setUserData(userDataValue);
    }
  }, []);
  
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  const handleSearchOrderId = (event) => {
    setSearchOrderId(event.target.value);
    setPage(0);
  };

  const handleSearchDate = (event) => {
    setSearchDate(event.target.value);
    setPage(0);
  };

  const filteredData = data.filter((row) => {
    const orderIdMatch = row.OrderID.includes(searchOrderId);
    const dateMatch = searchDate ? row.createdAt.includes(searchDate) : true;
    return orderIdMatch && dateMatch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedRows = sortedData.slice(startIndex, endIndex);

  const handleRowClick = (row) => {
    router.push(`/Order/${row._id}`);
  };

  return (
    <div>
      <Stack direction="row" gap={1} alignItems="center" >
        <TextField
          label="Search by Order ID"
          disabled={paginatedRows.length !== 0? false : true }
          value={searchOrderId}
          onChange={handleSearchOrderId}
          style={{ marginBottom: '1rem' }}
        />

        <TextField
          type="date"
          disabled={paginatedRows.length !== 0? false : true }
          value={searchDate}
          onChange={handleSearchDate}
          style={{ marginBottom: '1rem' }}
        />
        <span style={{ flex: 1 }} />
        {addOrderButton}
      </Stack>
        {paginatedRows.length === 0? 
        <Box sx={{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
            
            <Typography sx={{fontSize:"20px",fontWeight:"700",color:"#ccc"}}>No Order {userData?.userType === USERTYPE.MENUFECTURE?  "Added": "Received" }</Typography>
        </Box>
        :""
        }
        {paginatedRows.length !== 0? 
      <TableContainer component={Paper} sx={{ minHeight: '70vh' ,boxShadow:"none"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize:{md:"15px",sm:"12px"},fontWeight:"700",color:"#ccc"}}>Order ID</TableCell>
              <TableCell sx={{fontSize:{md:"15px",sm:"12px"},fontWeight:"700",color:"#ccc"}}>To</TableCell>
              <TableCell sx={{fontSize:{md:"15px",sm:"12px"},fontWeight:"700",color:"#ccc"}}>From</TableCell>
              <TableCell sx={{fontSize:{md:"15px",sm:"12px"},fontWeight:"700",color:"#ccc"}}>Quantity</TableCell>
              <TableCell sx={{fontSize:{md:"15px",sm:"12px"},fontWeight:"700",color:"#ccc"}}>Cost</TableCell>
              <TableCell sx={{fontSize:{md:"15px",sm:"12px"},fontWeight:"700",color:"#ccc"}}>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >

            {paginatedRows.map((row ,i) => (
              <TableRow key={row._id} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer',background:i%2 == 0 ?"#F9F9F9":"" }} hover>
                <TableCell sx={{fontSize:{md:"15px",sm:"12px"},fontWeight:"700"}}>{row.OrderID}</TableCell>
                <TableCell sx={{fontSize:{md:"15px",sm:"12px"}}}>{row.To}</TableCell>
                <TableCell sx={{fontSize:{md:"15px",sm:"12px"}}}>{row.From}</TableCell>
                <TableCell sx={{fontSize:{md:"15px",sm:"12px"}}}>{row.Quantity}</TableCell>
                <TableCell sx={{fontSize:{md:"15px",sm:"12px"},color:"#49B852",fontWeight:"700"}}>{row.cost} RS/-</TableCell>
                <TableCell sx={{fontSize:{md:"15px",sm:"12px"}}}>
                  {format(new Date(row.createdAt), 'dd/MM/yyyy')} on  
                  {format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm') === '12:00'
                  ? '12:00 PM'
                  : format(new Date(row.createdAt), ' hh:mm a')} 
                </TableCell>
              </TableRow>
            ))}
             
          </TableBody>
        </Table>
      
        
      </TableContainer>
      :""
      
      }
      {paginatedRows.length !== 0? 

        <TablePagination
        component="div"
        count={sortedData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
      :""}
    </div>
  );
}

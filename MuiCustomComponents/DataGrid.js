import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function DataGrid({ data, addOrderButton }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const router = useRouter();

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
      <Stack direction="row" gap={1} alignItems="center">
        <TextField
          label="Search by Order ID"
          value={searchOrderId}
          onChange={handleSearchOrderId}
          style={{ marginBottom: '1rem' }}
        />

        <TextField
          type="date"
          value={searchDate}
          onChange={handleSearchDate}
          style={{ marginBottom: '1rem' }}
        />
        <span style={{ flex: 1 }} />
        {addOrderButton}
      </Stack>

      <TableContainer component={Paper} sx={{ minHeight: '70vh' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>To</TableCell>
              <TableCell>From</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row._id} onClick={() => handleRowClick(row)} style={{ cursor: 'pointer' }} hover>
                <TableCell>{row.OrderID}</TableCell>
                <TableCell>{row.To}</TableCell>
                <TableCell>{row.From}</TableCell>
                <TableCell>{row.Quantity}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell>{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={sortedData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import {LocalShipping} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { IReview } from '../../types';

interface Column {
  id: 'productName' | 'rating' | 'review';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'productName', label: 'Product Name', minWidth: 170 },
  { id: 'review', label: 'Review', minWidth: 100 },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },

];



function createData(
  userID:string,
  productName: string,
  review: string,
  rating: number,
): IReview {
  return { userID,productName, review, rating};
}

const rows = [
  createData('user1','Kottamalli', 'Good product to use daily and good for our health !.....', 4.5),

];

// name, code, population, size, density

export default function ReviewTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ minWidth: 275 , border: '1px solid green' , padding: '70px' , borderRadius:'30px' , backgroundColor: 'rgba(234, 234, 234, 0.1)' ,marginTop:'100px' ,marginBottom:'20px', boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)',}} >
    <div style={{ display: "flex", justifyContent: "center" ,color:'gray'}}>
     <Typography variant="h4" gutterBottom>
         {/* <LocalShipping /> */}
         Review History
     </Typography>
     </div>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.productName}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>
  );
}
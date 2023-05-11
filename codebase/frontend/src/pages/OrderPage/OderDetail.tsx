import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {LocalShipping} from '@mui/icons-material';
import Button from '@mui/material/Button';
import { color } from '@mui/system';
import ShippingStatusStepper from './ShippingStatus';
import { Grid } from '@mui/material';
import ReviewPopup from '../ReviewPage/ReviewPopup';
import { CartItem } from '../../types';
import Avatar from '@mui/material/Avatar';
import { IOrder } from '../../types';


function createData(
    orderId: string,
    userId: string,
    date: string,
    deliveryFee: number,
    payment: string,
    total: number,
    deliveryStatus: string,
): IOrder{
  return {
    orderId,
    date,
    userId,
    deliveryFee,
    payment,
    total,
    deliveryStatus,
    history: [
      {
      productName: "Product 1",
      price: 10.99,
      image: "https://www.nicepng.com/png/detail/394-3948184_hemp-skincare-cbd-skincare-sativa-product-range-skin.png",
      amount: 4,
    },
    {
      productName: "Product 2",
      price: 10.99,
      image: "https://www.pngitem.com/pimgs/m/43-434027_product-beauty-skin-care-personal-care-liquid-tree.png",
      amount: 4,
    },
    ],
  };
}


function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.deliveryFee}</TableCell>
        <TableCell align="right" sx={{color: row.payment === 'Payed' ? 'green' :  row.payment === 'Unpayed' ? 'red':'red'}}>{row.payment}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell align="right" sx={{color: row.deliveryStatus === 'shipped' ? 'green' : row.deliveryStatus === 'In progress' ? 'red' : row.deliveryStatus === 'Dispatched' ? 'orange':'green'}}>{row.deliveryStatus}</TableCell>
      </TableRow>
      
      <TableRow sx={{backgroundColor: 'rgba(132, 208, 68, 0.1)'}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 , padding:'50px'}}>
              <Typography variant="h6" gutterBottom component="div" color={"green"}>
                Perchaced Products
              </Typography>
              <Table size="medium" aria-label="purchases" >
                <TableHead>
                  <TableRow>
                    <TableCell>Product Image</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Unit Price (Rs)</TableCell>
                    <TableCell align="right">Total price (Rs)</TableCell>
                    <TableCell align="right">Add a Review</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.image}>
                      <TableCell component="th" scope="row">
                      <Avatar alt={historyRow.productName} src={historyRow.image} />  
                      </TableCell>
                      <TableCell>{historyRow.productName}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">{historyRow.price}</TableCell>
                      <TableCell align="right"> {Math.round(historyRow.amount * historyRow.price * 100) / 100} </TableCell>
                      <TableCell> 
                         <ReviewPopup/>
                       </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box sx={{marginTop:'20px'}}>
              <Typography variant="h6" gutterBottom component="div" color={"Red"} align={"center"} border={"2px solid"} borderRadius={"30px"}>
                Order Tracking Status
              </Typography>
                 <ShippingStatusStepper/> 
              </Box>
            </Box>       
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('ddg','user1','2023-03-15', 159, 'Payed', 324,'In progress'),
  createData('ddg','user1','2023-03-15', 237, 'Payed', 337,'shipped'),
  createData('ddg','user1','2023-03-15', 262, 'Unpayed', 424,'Dispatched'),
  createData('ddg','user1','2023-03-15', 305, 'Payed', 667,'shipped'),
  createData('ddg','user1','2023-03-15', 356, 'Payed', 549,'In progress'),
];

export default function Order() {
  return (
    <Box sx={{ minWidth: 275 , border: '1px solid green' , padding: '70px' , borderRadius:'30px' , backgroundColor: 'rgba(234, 234, 234, 0.1)' ,marginTop:'100px' ,marginBottom:'20px', boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.25)',}} >
    <div style={{ display: "flex", justifyContent: "center" ,color:'gray'}}>
     <Typography variant="h4" gutterBottom>
         <LocalShipping />
         Order History
     </Typography>
     </div>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Oder ID</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Delivery Charge&nbsp;(Rs)</TableCell>
            <TableCell align="right">Payment Status</TableCell>
            <TableCell align="right">Total Price&nbsp;(Rs)</TableCell>
            <TableCell align="right">Delivery Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.orderId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}




   
      
    
    

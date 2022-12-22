import React, {useState, useEffect} from 'react';
import {Table, Switch, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function EarningsTable({rows}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Account details</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Approve Request</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, i) => (
            < EarningsRow key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function EarningsRow({row}){
    const [paid, setPaid]= React.useState(false)
    const toggle = ()=> {
        
    }
    return (
        <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right"><Switch onClick={toggle} checked={paid} />
</TableCell>
            </TableRow>
    )
}
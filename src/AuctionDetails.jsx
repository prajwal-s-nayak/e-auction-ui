import  { Grid, CardContent , Card, Button , Select , MenuItem , InputLabel ,Typography} from '@material-ui/core';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import React, { MouseEvent, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead'
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
  
  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };  

  function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  


  const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const AuctionDetails = ({
    initialAuctionData,
}
) => {
    const[currentAuction,setCurrentAuction] = useState([{
        bidAmount: 0,
        buyerName:  "",
        buyerEmail:  "",
        buyerPhoneNo:  "",
    }]);

    useEffect(()=>{   
        setCurrentAuction(initialAuctionData);
        },[]);
 
        //const data =[{"name":"test1"},{"name":"test2"}];
    //const listItems = currentAuction.map((d) => <li key={d.buyerEmail}>{d.buyerName} {d.bidAmount} {d.buyerEmail}  {d.buyerPhoneNo}</li>);
    const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, currentAuction.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

return(
    <div>
        {/* <h1> Hello World  </h1>
        <InputLabel id="demo-simple-select-label" variant = "standard">{listItems}</InputLabel> */}
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
             <StyledTableCell>Bid Amount </StyledTableCell>
             <StyledTableCell>Buyer Name </StyledTableCell>
             <StyledTableCell>Buyer Email </StyledTableCell>
             <StyledTableCell>Buyer Phone </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? currentAuction.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : currentAuction
          ).map((row) => (
            <TableRow key={row.buyerEmail}>
              <TableCell component="th" scope="row" style={{ width: 160 }}>
                {row.bidAmount}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.buyerName}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.buyerEmail}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.buyerPhoneNo}
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={currentAuction.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
    
);
};

export default AuctionDetails;
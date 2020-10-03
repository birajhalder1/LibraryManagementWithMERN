import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { Edit, DeleteForever } from "@material-ui/icons";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../../actions/createBookAction";

import axios from "axios";
import { proxy } from "../../proxy";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 500,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    maxHeight: 440,
  },

  table: {
    minWidth: 300,
  },
  editIconColor: {
    color: "#29b6f6",
  },
  deleteIconColor: {
    color: "#900000",
  },
  addUserButton: {
    color: "#900000",
  },
}));

function AllBook() {
  const classes = useStyles();
  const [bookInfo, setBookInfo] = React.useState([]);
  const [book, setBooks] = React.useState([]);
  const [searchBook, setSearchBook] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${proxy}/api/v1/books`)
      .then((res) => {
        //console.log(res);
        // setBooks(res.data.data);
        dispatch(getAllBooks(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
    // handleDeleteRecord();
  }, []);

  let allBooksRecords = useSelector((state) => state.bookReducer);
  // setBooks(allBooksRecords);
  console.log(allBooksRecords);

  // Search user name
  const handleChange = (bookName) => {
    setSearchBook(bookName);
    axios
      .get(`${proxy}/api/v1/books/${bookName}`)
      .then((res) => {
        //console.log(res.data.data);
        setBooks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete record from table
  const handleDeleteRecord = (id) => {
    axios
      .delete(`${proxy}/api/v1/books/${id}`)
      .then((res) => {
        console.log(res, " Record has been deleted");
        // setBookInfo(res.data.data);
        let newBookInfo = [...bookInfo];
        newBookInfo.splice(
          bookInfo.findIndex((oBookInfo) => oBookInfo._id === id),
          1
        );
        setBookInfo(newBookInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          // marginTop: "50px",
          marginBottom: "50",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: 300 }}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">All Book</Typography>
        </Breadcrumbs>
        <div
          style={{
            textAlign: "right",
            marginRight: 20,
          }}
        >
          <SearchIcon style={{ marginTop: 25 }} />

          <TextField
            //
            margin="dense"
            id="name"
            label="Search"
            placeholder="Search Book Name"
            value={searchBook}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        <br />

        <Paper className={classes.root}>
          <TableContainer component={Paper} className={classes.container}>
            <Table
              // stickyHeader
              // className={classes.table}
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Book Name</TableCell>
                  <TableCell align="center">Author Name</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Availability</TableCell>

                  <TableCell align="center">Action Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allBooksRecords
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">
                        {row._id}
                      </TableCell>
                      <TableCell align="center">{row.bookName}</TableCell>
                      <TableCell align="center">{row.authorName}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        {row.currentAvailibility}
                      </TableCell>

                      <TableCell align="center">
                        <Tooltip title="Edit info">
                          <Edit className={classes.editIconColor} />
                        </Tooltip>
                        <Tooltip
                          title="Delete info"
                          style={{ marginTop: "10px" }}
                          onClick={() => handleDeleteRecord(row._id)}
                        >
                          <DeleteForever className={classes.deleteIconColor} />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={allBooksRecords.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default AllBook;

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../../actions/createBookAction";

import axios from "axios";
import { proxy } from "../../proxy";

const columns = [
  { id: "bookName", label: "Book Name", minWidth: 100 },
  { id: "authorName", label: "Author Name", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 200,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "currentAvailibility",
    label: "Availability",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // "& > * + *": {
    //   marginTop: theme.spacing(2),
    // },
  },
  container: {
    maxHeight: 440,
  },
}));

export default function AllBook(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [book, setBooks] = React.useState([]);
  const [searchBook, setSearchBook] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
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

  return (
    <div style={{ marginLeft: "100px", marginRight: "100px" }}>
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

      {/* {allBooksRecords.map((details, index) => (
        <div key={index}>{details.bookName}</div>
      ))} */}

      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
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
              {allBooksRecords
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
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
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={allBooksRecords.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

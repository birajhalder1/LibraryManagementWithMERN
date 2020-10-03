import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TablePagination from "@material-ui/core/TablePagination";
import { Edit, DeleteForever } from "@material-ui/icons";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import axios from "axios";
import { proxy } from "../../proxy";

import {
  issueUser,
  searchUserName,
  isBookAvailable,
  getAllUsers,
} from "../../actions/createUserAction";

import { getAllBooks } from "../../actions/createBookAction";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: 500,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  autoField: {
    width: 300,
    marginRight: 20,
  },
  table: {
    minWidth: 300,
  },
  // editIconColor: {
  //   color: "#29b6f6",
  // },
  // deleteIconColor: {
  //   color: "#900000",
  // },
  addUserButton: {
    fontSize: 50,
    marginTop: 5,
  },
}));

function CreateUser(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [book, setBook] = React.useState("");
  const [author, setAuthor] = React.useState("");

  const [bookName, setBookName] = React.useState([]);
  const [authorName, setAuthorName] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState([]);
  const [searchUser, setSearchUser] = React.useState("");
  const [bookAvailability, setBookAvailability] = React.useState([]);
  // const [inputBookAvailability, setInputBookAvailability] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  // syntax for useEffect
  // arguments for useEffect
  // 1. Call back funciton
  // 2. dependent array
  // useEffect(() => {}, []);

  // Fetch Data into database
  useEffect(() => {
    props.getAllBooks();

    props.getAllUsers();
    showBookAvailability();
    allAuthorName();
  }, []);

  useEffect(() => {
    if (props.user) {
      // console.log(props.user);
      setUserInfo(props.user);
    }
    // if (props.book && props.book.length > 0) {
    //   let aBookNames = props.book.map((bookItem) => bookItem.bookName);
    //   setBookName(aBookNames);
    //   console.log(aBookNames);

    //   let aAutharNames = props.book.map((bookItem) => bookItem.authorName);
    //   setAuthorName(aAutharNames);
    //   console.log(aAutharNames);
    // }
  }, [props]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Check all field empty or not
  const allFieldAreFilled = () => {
    if (name === "" || username === "" || email === "" || phone === "") {
      return false;
    } else {
      return true;
    }
  };

  // After submit all field clear
  const handleClear = () => {
    setName("");
    setUsername("");
    setEmail("");
    setPhone("");
  };

  const handleSubmit = () => {
    if (allFieldAreFilled) {
      const insertData = {
        name: name,
        username: username,
        email: email,
        phone: phone,
        // bookname: book._id,
        book: bookName._id,
        // author: author,
      };
      console.log(insertData);
      // Set Data Post Request
      props.issueUser(insertData);
      handleClear();
      setOpen(false);
    } else {
      alert("Please all field insert data");
    }
  };

  // Search user name
  const handleChange = (name) => {
    setSearchUser(name);
  };

  // Fetch book table for available book
  const showBookAvailability = () => {};

  // Fetch all author name in author field
  const allAuthorName = () => {
    axios
      .get(`${proxy}/api/v1/books`)
      .then((res) => {
        // console.log(res.data.data);
        setAuthorName(res.data.data);
        setBookName(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete record from table
  const handleDeleteRecord = (id) => {
    axios
      .delete(`${proxy}/api/v1/user/${id}`)
      .then((res) => {
        console.log(res, " Record has been deleted");
        // setUserInfo(res.data.data);
        let newUserInfo = [...userInfo];
        newUserInfo.splice(
          userInfo.findIndex((oUserInfo) => oUserInfo._id === id),
          1
        );
        setUserInfo(newUserInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: 300 }}>
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Create User</Typography>
      </Breadcrumbs>

      <div
        style={{
          textAlign: "right",
          marginRight: 20,
        }}
      >
        <SearchIcon />

        <TextField
          //
          margin="dense"
          id="name"
          label="Search"
          placeholder="Search User Name"
          value={searchUser}
          onChange={(e) => handleChange(e.target.value)}
        />

        <Tooltip title="Add User">
          <AddCircleIcon
            className={classes.addUserButton}
            color="primary"
            onClick={handleClickOpen}
          />
        </Tooltip>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">User Information</DialogTitle>
          <ul>
            {bookAvailability.map((book) => (
              <li key={book._id}>
                {book.bookName} is available only:- {book.currentAvailibility}
              </li>
            ))}
          </ul>
          <DialogContent>
            <DialogContentText>
              All information are mendatory for our official. So please type all
              information correctly.
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="username"
              label="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="phone"
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              fullWidth
            />

            <Autocomplete
              id="book"
              options={bookName}
              onInputChange={(evemt, value) => {
                setBook(value);
                // console.log(value);
              }}
              getOptionLabel={(option) => option.bookName}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Book Name" />
              )}
            />
            {/* <Autocomplete
              id="author"
              options={authorName}
              onInputChange={(evemt, value) => {
                setAuthor(value);
              }}
              getOptionLabel={(option) => option.authorName}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Author Name" />
              )}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleSubmit()} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          marginTop: "50px",
          marginBottom: "50",
        }}
      >
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Book Name</TableCell>
                <TableCell align="center">Author Name</TableCell>
                <TableCell align="center">Action Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userInfo
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>

                    <TableCell align="center">{row.book}</TableCell>
                    <TableCell align="center">{row.author}</TableCell>
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
                      {/* <Button variant="outlined" color="primary">
                      Update
                    </Button> */}

                      {/* <Button
                      style={{ marginTop: "10px" }}
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteRecord(row._id)}
                    >
                      Delete
                    </Button> */}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 10, 25, 100]}
          component="div"
          count={userInfo.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

CreateUser.propTypes = {
  issueUser: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getAllBooks: PropTypes.func.isRequired,
  isBookAvailable: PropTypes.func.isRequired,
  searchUserName: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
  book: PropTypes.array.isRequired,
};

const mapStateToProps = (reduxState) => ({
  user: reduxState.userReducer,
  book: reduxState.bookReducer,
});

// const mapDispatchToProps = (dispatch) => ({
//   issueBook: bindActionCreators(issueBook, dispatch),
//   getAllUsers: bindActionCreators(getAllUsers, dispatch),
// });

export default connect(mapStateToProps, {
  issueUser,
  getAllUsers,
  getAllBooks,
})(CreateUser);

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

import * as utils from "../../utils";

import axios from "axios";
import { proxy } from "../../proxy";

import {
  issueUser,
  searchUserName,
  // isBookAvailable,
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

  addUserButton: {
    fontSize: 50,
    marginTop: 5,
  },
}));

function CreateUser(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [editButtonOpen, setEditButtonOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [book, setBook] = React.useState("");
  const [author, setAuthor] = React.useState("");

  const [bookName, setBookName] = React.useState([]);
  const [authorName, setAuthorName] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState([]);
  const [editUserInfo, setEditUserInfo] = React.useState([]);
  const [searchUser, setSearchUser] = React.useState("");
  // const [bookAvailability] = React.useState([]);
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
    // setEditUserInfo();
    // showBookAvailability();
  }, []);

  useEffect(() => {
    if (props.user) {
      setUserInfo(props.user);
    }

    if (props.book && props.book.length > 0) {
      let aBookNames = props.book.map((bookItem) => ({
        label: bookItem.bookName,
        value: bookItem.bookName.toLowerCase(),
      }));
      // console.log(aBookNames);

      setBookName(aBookNames);

      let aAutharNames = props.book.map((bookItem) => ({
        label: bookItem.authorName,
        value: bookItem.authorName.toLowerCase(),
      }));
      setAuthorName(aAutharNames);
    }
  }, [props]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickEdit = () => {
    setEditButtonOpen(true);
    axios
      .get(`${proxy}/api/v1/user`)
      .then((res) => {
        // console.log(res.data.data);
        setEditUserInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleButtonClose = () => {
    setEditButtonOpen(false);
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
      let oBook = props.book.filter(
        (oBook) => oBook.bookName === book && oBook.authorName === author
      )[0];

      console.log(oBook);
      // let checkAvailable = oBook.filter((oBookCheck => oBookCheck.currentAvailability))

      if (oBook === undefined ) {
        alert("Not available");
      } else {
        if(oBook.currentAvailability > 0){
          const insertData = {
            name: name,
            username: username,
            email: email,
            phone: phone,
            book: oBook._id,
          };
          props.issueUser(insertData);
          handleClear();
          setOpen(false);
          props.getAllUsers();
        }else{
          alert("Presently book is not available")
        }
        
      }
    } else {
      alert("Please all field insert data");
    }
  };

  // Search user name
  const handleChange = (userName) => {
    setSearchUser(userName);
    props.searchUserName(userName);
  };

  // Fetch book table for available book
  // const showBookAvailability = () => {};

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

  // Update data
  const handleUpdate = () => {
    console.log("hiit");
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
          {/* <ul>
            {bookAvailability.map((book) => (
              <li key={book._id}>
                {book.bookName} is available only:- {book.currentAvailibility}
              </li>
            ))}
          </ul> */}
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
              }}
              getOptionLabel={(option) => option.label}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={utils.oCreateUseri18nTxt.BOOK_NAME_TXT}
                />
              )}
            />
            <Autocomplete
              id="author"
              options={authorName}
              onInputChange={(evemt, value) => {
                setAuthor(value);
              }}
              getOptionLabel={(option) => option.label}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={utils.oCreateUseri18nTxt.AUTHOR_NAME_TXT}
                />
              )}
            />
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
            <TableHead style={{ backgroundColor: "#f2f2f2" }}>
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
                .map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>

                    <TableCell align="center">{row.book.bookName}</TableCell>
                    <TableCell align="center">{row.book.authorName}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Edit info">
                        <Edit
                          // onClick={() => handleEdit()}
                          onClick={handleClickEdit}
                        />
                      </Tooltip>
                      <Tooltip
                        title="Delete info"
                        style={{ marginTop: "10px" }}
                        onClick={() => handleDeleteRecord(row._id)}
                      >
                        <DeleteForever />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Update table row */}
        <div>
          <Dialog
            open={editButtonOpen}
            onClose={handleButtonClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">User Information</DialogTitle>
            {/* <ul>
            {bookAvailability.map((book) => (
              <li key={book._id}>
                {book.bookName} is available only:- {book.currentAvailibility}
              </li>
            ))}
          </ul> */}
            <DialogContent>
              <DialogContentText>All information can update.</DialogContentText>

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
                }}
                getOptionLabel={(option) => option.label}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={utils.oCreateUseri18nTxt.BOOK_NAME_TXT}
                  />
                )}
              />
              <Autocomplete
                id="author"
                options={authorName}
                onInputChange={(evemt, value) => {
                  setAuthor(value);
                }}
                getOptionLabel={(option) => option.label}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={utils.oCreateUseri18nTxt.AUTHOR_NAME_TXT}
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleButtonClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => handleUpdate()} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
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
  // isBookAvailable: PropTypes.func.isRequired,
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
  searchUserName,
})(CreateUser);

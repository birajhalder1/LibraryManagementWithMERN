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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// Redux import
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllUsers, searchUserName } from "../../actions/createUserAction";

// import axios from "axios";
// import { proxy } from "../../proxy";

const columns = [
  { id: "name", label: " Name", minWidth: 100 },
  { id: "username", label: "User Name", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
}));

function AllUser(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = React.useState([]);
  const [searchUser, setSearchUser] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    props.getAllUsers();
    // axios
    //   .get(`${proxy}/api/v1/user`)
    //   .then((res) => {
    //     //console.log(res);
    //     setUsers(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  useEffect(() => {
    if (props.user) {
      // console.log(props.user);
      setUsers(props.user);
    }
  }, [props]);

  // Search user name
  const handleChange = (name) => {
    console.log(name);
    setSearchUser(name);
    setUsers(props.user);
    // axios
    //   .get(`${proxy}/api/v1/user/${name}`)
    //   .then((res) => {
    //     //console.log(res.data.data);
    //     setUsers(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div style={{ marginLeft: "100px", marginRight: "100px" }}>
      <div
        style={{
          textAlign: "right",
          marginRight: 20,
        }}
      >
        <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: 300 }}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">All User</Typography>
        </Breadcrumbs>
        <SearchIcon style={{ marginTop: 25 }} />

        <TextField
          //
          margin="dense"
          id="name"
          label="Search"
          placeholder="Search Book Name"
          value={searchUser}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      <br />

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
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

AllUser.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  searchUserName: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
};

const mapStateToProps = (reduxState) => ({
  user: reduxState.userReducer,
});

export default connect(mapStateToProps, { getAllUsers, searchUserName })(
  AllUser
);

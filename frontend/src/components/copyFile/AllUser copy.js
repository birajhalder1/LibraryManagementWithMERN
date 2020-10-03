import React, { useState, useEffect } from "react";
import axios from "axios";
import { proxy } from "../../proxy";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
//import { Button } from "@material-ui/core";

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
}));

export default function AllUser() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  //const [userInfos, setUserInfos] = useState([]);

  const handleChange = (name) => {
    setName(name);
    axios
      .get(`${proxy}/api/v1/user/${name}`)
      .then((res) => {
        // console.log(res.data.data);
        setUserInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${proxy}/api/v1/user/`)
      .then((res) => {
        setUserInfo(res.data.data);
        //console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        textAlign: "right",
        marginRight: 20,
      }}
    >
      <TextField
        margin="dense"
        id="name"
        label="Search"
        placeholder="Search User Name"
        value={name}
        onChange={(e) => handleChange(e.target.value)}
      />

      <br />
      {/* 
      {userInfo.map((details) => (
        <div key={details._id}>{details.name}</div>
      ))} */}

      <div
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          marginTop: "50px",
          marginBottom: "50",
        }}
      >
        {userInfo === "" ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {userInfo.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {userInfo.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

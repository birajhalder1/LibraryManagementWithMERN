import React, { useEffect } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../actions/createUserAction";

import axios from "axios";
import { proxy } from "../../proxy";

function Transaction() {
  const [user, setUser] = React.useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${proxy}/api/v1/user`)
      .then((res) => {
        console.log(res);
        // setBooks(res.data.data);
        dispatch(getAllUsers(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let users = useSelector((state) => state.userReducer);
  console.log(users);

  return (
    <div>
      <center>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: 300 }}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">Transaction</Typography>
        </Breadcrumbs>
        <h1>Transaction</h1>
        {users.name}
      </center>
    </div>
  );
}

export default Transaction;

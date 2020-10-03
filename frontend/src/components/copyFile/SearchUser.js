import React, { useState, useEffect } from "react";
import axios from "axios";
//import { proxy } from "../../proxy";

// import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
//import { Button } from "@material-ui/core";

export default function SearchUser() {
  const [post, setPost] = useState({});
  const [id, setId] = useState(1);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) => {
        console.log(res);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div
      style={{
        marginLeft: "100px",
        marginRight: "100px",
        marginTop: "50px",
        marginBottom: "50",
      }}
    >
      <TextField
        margin="dense"
        id="name"
        label="Search"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <br />
      <div>{post.title}</div>

      {/* <ul>
        {post.map((userDetails) => (
          <li key={userDetails.id}>{userDetails.title}</li>
        ))}
      </ul> */}
    </div>
  );
}

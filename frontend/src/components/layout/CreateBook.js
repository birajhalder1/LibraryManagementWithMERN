import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { TextField, Container, Button } from "@material-ui/core/";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

// import axios from "axios";
// import { proxy } from "../../proxy";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { issueBook } from "../../actions/createBookAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "50ch",
    },
    multilineColor: {
      color: "red",
    },
  },
}));

function CreateBook(props) {
  const classes = useStyles();

  const [book, setBook] = useState("");
  const [author, setAuthor] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [availability, setAvailability] = React.useState("");

  // After submit all field clear
  const handleClear = () => {
    setBook("");
    setAuthor("");
    setDescription("");
    setAvailability("");
  };

  // Check all field empty or not
  const allFieldAreFilled = () => {
    if (
      book === "" ||
      author === "" ||
      description === "" ||
      availability === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleInsertBook = () => {
    if (allFieldAreFilled()) {
      let inserBookData = {
        bookName: book,
        authorName: author,
        description: description,
        currentAvailibility: availability,
      };

      props.issueBook(inserBookData);
      handleClear();

      // Set data
      // await axios
      //   .post(`${proxy}/api/v1/books`, insertData)
      //   .then((res) => {
      //     console.log(res);
      //     alert("Submit successfully");
      //     handleClear();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    } else {
      alert("Please all field insert data");
    }
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: 300 }}>
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">Create Book</Typography>
      </Breadcrumbs>
      <div
        style={{
          marginRight: "auto",
          marginLeft: 100,
          marginBottom: 100,
          marginTop: 80,
          borderWidth: "2px",
          borderStyle: "inset",
        }}
      >
        <h2 align="center">Book Register</h2>
        <br />

        <center>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="filled-basic"
              label="Book Name"
              variant="filled"
              fullWidth
              value={book}
              onChange={(e) => setBook(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Author Name"
              variant="filled"
              placeholder="input, multiple author name"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Description"
              variant="filled"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Current Availability"
              variant="filled"
              fullWidth
              InputProps={{
                classes: {
                  input: classes.multilineColor,
                },
              }}
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: "5px" }}
              onClick={() => handleInsertBook()}
            >
              Submit
            </Button>
          </form>
        </center>
      </div>
    </Container>
  );
}

CreateBook.propTypes = {
  issueBook: PropTypes.func.isRequired,
  book: PropTypes.array.isRequired,
};

const mapStateToProps = (reduxState) => ({
  book: reduxState.bookReducer,
});

export default connect(mapStateToProps, { issueBook })(CreateBook);

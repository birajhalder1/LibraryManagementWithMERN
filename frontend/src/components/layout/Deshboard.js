import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

function Deshboard() {
  return (
    <div>
      <center>
        <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: 300 }}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">Deshboard</Typography>
        </Breadcrumbs>
        <h2>Deshboard</h2>
      </center>
    </div>
  );
}

export default Deshboard;

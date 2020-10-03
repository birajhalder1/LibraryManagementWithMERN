import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import ForumIcon from "@material-ui/icons/Forum";
import PostAddIcon from "@material-ui/icons/PostAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function Drawers() {
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
      <List>
        <Link className={classes.link} to="/dashboard">
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <AutorenewIcon style={{ color: "#66ccff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>

        <Link className={classes.link} to="/createUser">
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <AssignmentIndIcon style={{ color: "#66ff99" }} />
            </ListItemIcon>
            <ListItemText primary="User Register" />
          </ListItem>
        </Link>

        <Link className={classes.link} to="/createBook">
          <ListItem button onClick={handleDrawerClose}>
            <ListItemIcon>
              <PostAddIcon style={{ color: "#ffb399" }} />
            </ListItemIcon>
            <ListItemText primary="Create Book" />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      {/* {["left", "right", "top", "bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))} */}

      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>Left</Button>
        <Drawer onClose={toggleDrawer(false)}></Drawer>
      </React.Fragment>
    </div>
  );
}

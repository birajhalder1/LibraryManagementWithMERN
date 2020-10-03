import React from "react";
import { connect } from "react-redux";

function UserDetails() {
  const [user, setUser] = React.useState({});

  useEffect(() => {
    if (props.user) {
      setUser(props.user);
    }
  }, [props]);

  return <div></div>;
}

UserDetails.protoTypes = {
  users: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
};

function getSingleUserById(users, userId) {
  return users.filter((user) => user._id === userId)[0];
}

const mapStateToProps = (state, ownProps) => {
  let user = getSingleUserById(state.users, ownProps.match.params.id);
  return {
    users: state.users,
    user,
  };
};

export default connect(mapStateToProps)(UserDetails);

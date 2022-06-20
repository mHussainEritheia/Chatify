import { useState } from "react";
import { MdLogout } from "react-icons/md";
// components
import Logout from "./Logout";

const UserGreeting = (props) => {
  // Initialize initial state and its modifier function
  const [logoutData, setLogoutData] = useState({ showLogout: false });

  const showHideLogout = () => {
    setLogoutData({ ...logoutData, showLogout: !logoutData.showLogout });
  };

  const { username } = props;
  const { showLogout } = logoutData;

  return (
    <div className="user-info" onClick={showHideLogout}>
      <span className="user-greeting">
        <MdLogout style={{ width: "1.7em", height: "2em" }} /> {username}
      </span>
      {showLogout == true && <Logout />}
    </div>
  );
};

export default UserGreeting;

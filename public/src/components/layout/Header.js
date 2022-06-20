// components
import Contacts from "../Contacts";
import Title from "./Title";
import { Button } from "react-bootstrap";
import UserGreeting from "./UserGreeting";
import { useNavigate } from "react-router-dom";
import { AiOutlineContacts } from "react-icons/ai";
export default ({ userInfo }) => {
  const navigate = useNavigate();
  return (
    <div className="header d-flex justify-content-between">
      <Title />
      {userInfo ? (
        <div className="d-flex">
          <AiOutlineContacts
            fill="white"
            className="p-0 me-3"
            style={{ width: "2em", height: "2em" }}
            onClick={() => {
              navigate("/addcontact");
            }}
          />
          <UserGreeting username={userInfo.name} />
        </div>
      ) : (
        console.log("Not")
      )}
      {/* // {(userInfo && )  <Contacts />} */}
    </div>
  );
};

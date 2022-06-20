import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import e from "cors";
import MessagesPanel from "./conversation/MessagesPanel";
const Sidebar = (props) => {
  const [listusers, setusers] = useState([]);
  console.log("user id ", props.userInfo.userId);

  let textInput = React.createRef();
  var getid = props.userInfo.userId;

  useEffect(() => {
    Axios.post(`http://localhost:3000/record`, { userid: getid })
      .then((res) => {
        setusers(res.data);
        console.log("Get Value");
      })
      .catch(() => {
        console.log("Not Get value");
      });
  }, []);

  function myFunc(e) {
    Axios.post(`http://localhost:3000/addrooms`, {
      recieveid: e,
      senderid: getid,
    })
      .then((res) => {
        <>
          <MessagesPanel selectedRoomId={e} userInfo={props.userInfo} />
        </>;
      })
      .catch((err) => {
        console.log("Not Room Created");
      });
  }
  return (
    <>
      <div className="room-chat-header">
        <h5>Rooms</h5>
        {/* <Link to={history.location.pathname} className="chat-compose">
          <FaPlusCircle />
        </Link> */}
      </div>
      <div className="div1">
        {listusers.map((val) => {
          return (
            <div className="room-info active-room">
              <div className="room-icon-div">
                <div className="room-initials sidebar">
                  <div className="user-list-el" onClick={() => myFunc(val._id)}>
                    {val.username}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;

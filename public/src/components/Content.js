import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Row, Col, Card, Image } from "react-bootstrap";

// components
import RoomPanel from "./rooms/RoomPanel";
import MessagesPanel from "./conversation/MessagesPanel";
import Contacts from "./Contacts";
import Sidebar from "./Sidebar";
import { FaSms } from "react-icons/fa";

const Content = (props) => {
  // Initialize the initial data and its modifier
  const [contentData, setContentData] = useState({
    showMessagePanel: true,
    showRoomPanel: true,
    onlineRooms: [],
  });

  const socket = io();
  useEffect(() => {
    toggleMessagePanel(false, true);
    onConnect();
    onUserOnline();
    onMessageArrival();
  }, []);

  // connect to the socket
  const onConnect = () => {
    socket.on("connect", () => {
      console.log("Socket connected FROM React...");
      // emit all the room ids where the user belongs to see him / her as active
      console.log("User id set in Props of Userid is ", props.userInfo.userId);
      console.log("UserInformation is ", props.userInfo);
      if (props.userInfo.userId) {
        socket.emit("onlineUser", props.userInfo.userId);
      } else if (props.userInfo._id) {
        socket.emit("onlineUser", props.userInfo._id);
      } else {
        console.log("Error in Online User Socket");
      }
    });
  };

  // when a user is online
  const onUserOnline = () => {
    socket.on("onlineUser", (data) => {
      if (data && data.length > 0) {
        console.log("these rooms should be shown as online", data);
        notifyOnlineRooms(data);
      }
    });
  };

  // when a new message arrives through socket
  const onMessageArrival = () => {
    socket.on("message", (data) => {
      console.log("data value arrives from socket", data);
      fillRoomInfoFromSocket(data);
    });
  };

  // when the socket disconnects
  socket.on("disconnect", () => {
    console.log("SOCKET is disconnected.. .!!");
  });

  const toggleMessagePanel = (showMessagePanel, showRoomPanel) => {
    if (window.innerWidth < 500) {
      setContentData({ ...contentData, showMessagePanel, showRoomPanel });
      if (showMessagePanel == true) {
        props.toggleBackButton(true);
      }
    }
  };

  const setSelectedRoomId = (id) => {
    toggleMessagePanel(true, false);
    // set in the corresponding variable
    setContentData({ ...contentData, selectedRoomId: id });
  };

  const fillRoomInfoFromSocket = (message) => {
    setContentData({ ...contentData, newMessageFromSocket: message });
  };

  const notifyOnlineRooms = (rooms) => {
    setContentData({ ...contentData, onlineRooms: rooms });
  };

  const { userInfo } = props;
  let {
    showMessagePanel,
    showRoomPanel,
    selectedRoomId,
    newMessageFromSocket,
    onlineRooms,
  } = contentData;

  if (window.innerWidth < 500 && props.showBackButton == false) {
    showMessagePanel = false;
    showRoomPanel = true;
  }

  return (
    <Card className="bg-black">
      <Row className="content mx-0">
        <Col md={1} className="d-flex align-items-center flex-column">
          <FaSms
            style={{
              width: "2em",
              height: "2em",
              marginTop: "10px",
            }}
            fill="white"
          />
        </Col>
        <Col md={3} style={{ backgroundColor: "#191a1c" }}>
          <RoomPanel
            showRoomPanel={showRoomPanel}
            userInfo={userInfo}
            onlineRooms={onlineRooms}
            newMessageFromSocket={newMessageFromSocket}
            selectedRoomId={selectedRoomId}
            setSelectedRoomId={setSelectedRoomId}
          />
        </Col>
        <Col md={5}>
          <MessagesPanel
            showMessagePanel={showMessagePanel}
            selectedRoomId={selectedRoomId}
            newMessageFromSocket={newMessageFromSocket}
            notifyOnlineRooms={notifyOnlineRooms}
            socket={socket}
            userInfo={userInfo}
            
          />
        </Col>
        <Col md={3} style={{ backgroundColor: "#191a1c" }}>
          <Sidebar userInfo={userInfo} />
        </Col>
      </Row>
    </Card>
  );
};

export default Content;

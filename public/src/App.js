import { useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
// components
import Header from "./components/layout/Header";
import Content from "./components/Content";
import Footer from "./components/layout/Footer";
import Login from "./components/login/Login";
import AddContact from "./components/AddContact";
import Homee from "./Homee";
import Contacts from "./components/Contacts";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
// css

const App = () => {
  // Initialize the initial state and its modifier function
  const [appData, setAppData] = useState({
    showContent: false,
    showBackButton: false,
  });

  // toggle the message panel
  const toggleBackButton = (showBackButton) => {
    setAppData({ ...appData, showBackButton });
  };

  const onSuccessLogin = (userInfo) => {
    setAppData({ ...appData, userInfo, showContent: true });
  };

  const { showContent, userInfo, showBackButton } = appData;
  return (
    <div>
      {/* including the Title and other components */}
      <Header userInfo={userInfo} />

      <Routes>
        <Route
          path="/addcontact"
          element={<Contacts userInfo={userInfo} />}
        ></Route>
      </Routes>

      {showContent == false ? (
        <Routes>
          <Route
            path="/"
            element={<Login onSuccessLogin={onSuccessLogin} />}
          ></Route>
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Content
                userInfo={userInfo}
                showBackButton={showBackButton}
                toggleBackButton={toggleBackButton}
              />
            }
          ></Route>
        </Routes>
      )}
      <Footer
        showBackButton={showBackButton}
        toggleBackButton={toggleBackButton}
      />
    </div>
  );
};

export default App;

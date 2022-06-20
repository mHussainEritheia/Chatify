import { useState } from "react";

// components
import ErrorMessage from "./ErrorMessage";
import Loading from "../Loading";

// Constants
import Constants from "../Constants";
import { connectBackend } from "../connectBackend";
import Swal from "sweetalert2";
import "../../css/style.css";

const Login = (props) => {
  // Initialize the initial state and its modifier function
  const [loginData, setLoginData] = useState({
    showPasswordInput: false,
    showError: false,
    username: "",
    password: "",
    errorMessage: "Incorrect Credentials",
    showLoading: false,
  });

  // instantiate the Constants
  const allConstants = Constants();

  // handle when the username / password field is updated
  const handleOnChange = (e) => {
    // update the corresponding state values
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // handle when the ENTER key is pressed
  const login = (e) => {
    console.log("IN Login");
    console.log("Username", loginData.username);
    console.log("Username", loginData.password);
    console.log("KeyCode is ", e.keyCode);
    console.log("Which is ", e.which);
    // if (e.keyCode == 13 || e.which == 13) {
    // if username is entered enter the password
    if (loginData.username && loginData.password) {
      console.log("Everything is correct Go for verify...", loginData);
      verifyUser();
    } else if (loginData.username) {
      setLoginData({ ...loginData, showPasswordInput: true });
    } else {
      showErrorComponent();
    }
    // }
  };

  // verify the logged in user
  const verifyUser = async () => {
    const { username, password, showLoading } = loginData;

    // reset the username / password field
    setLoginData({
      ...loginData,
      password: "",
      username: "",
      showLoading: true,
    });

    try {
      const config = {
        method: allConstants.method.POST,
        url: allConstants.login,
        header: allConstants.header,
        data: { username, password },
      };

      const res = await connectBackend(config);
      console.log("Get Resonse", res.data);
      console.log("User Response id ", res.data._id);
      console.log("Response ID is ", res.data.userId);
      if (res.data.userId) {
        console.log("user authentication successful", res.data);
        setLoginData({ ...loginData, showLoading: false });
        // send the logged in user's data to parent
        console.log("Get Response");
        let timerInterval;
        Swal.fire({
          title: "You Are Logged In!",
          html: "Success.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
          }
        });
        props.onSuccessLogin(res.data);
      } else if (res.data._id) {
        console.log("In Else If");
        console.log("user authentication successful", res.data);
        setLoginData({ ...loginData, showLoading: false });
        // send the logged in user's data to parent
        console.log("Get Response");
        props.onSuccessLogin(res.data);
      } else {
        // show the error message
        console.log("Error");
        showErrorComponent();

        // reload the page
        // setTimeout(() => {
        //   location.reload();
        // }, 2000);
      }
    } catch (err) {
      console.log("some error occurred...", err);
    }
  };

  const showErrorComponent = () => {
    // show the error message component
    setLoginData({ ...loginData, showError: true });

    // hide the error message component after 3sec
    // setTimeout(() => {
    //   setLoginData({ ...loginData, showError: false });
    // }, 2000);
  };

  const {
    showError,
    showPasswordInput,
    showLoading,
    errorMessage,
    username,
    password,
  } = loginData;
  return (
    <div className="login">
      <div className="login-form">
        <center>
          <div className="login-title">Chatify</div>
        </center>
        <center>
          <label className="welcome">Welcome Lets get Started!</label>
        </center>
        <br></br>
        {showError == true && <ErrorMessage message={errorMessage} />}

        <input
          className="fields"
          type="text"
          placeholder="Enter username"
          onChange={handleOnChange}
          name="username"
          value={username}
        />
        <input
          className="fields"
          type="password"
          placeholder="Enter Your Phone Number"
          onChange={handleOnChange}
          name="password"
          value={password}
        />
        <br></br>
        <button className="btn" onClick={login}>
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;

import { React, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
const Contacts = (props) => {
  const [userdetails, setuserdetails] = useState({
    username: "",
    phone_number: "",
  });

  console.log("Props data is ", props.userInfo);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setuserdetails({ ...userdetails, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    console.log("Username is Button", userdetails.username);
    console.log("Phone Number is button", userdetails.phone_number);

    Axios.post(`http://localhost:3000/data`, {
      username: userdetails.username,
      phone_number: userdetails.phone_number,
      addedby: props.userInfo.userId,
    })
      .then((res) => {
        console.log("Response is ", res.status);
        if (res.status == 200) {
          Swal.fire("Success", "New Contact Added", "success");
        } else if (res.status == 300) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Phone Number Already Registered",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        } else if (res.status == 400) {
          Swal.fire("Empty Fields", "Please Fill Fields", "error");
        }
      })
      .catch(() => {
        console.log("Not Saved");
      });
  };
  return (
    <>
      <div>
        <style></style>
        <center>
          <label>Create Employee</label>
        </center>
        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Contact Name</label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter Your Full Name"
              name="username"
              value={userdetails.username}
              onChange={handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your Phone Number"
              name="phone_number"
              value={userdetails.phone_number}
              onChange={handleInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Enter Only 11 digit number
            </small>
          </div>
          <input
            type="submit"
            value="Add Contact"
            className="btn btn-primary"
          />
        </form>
      </div>
    </>
  );
};

export default Contacts;

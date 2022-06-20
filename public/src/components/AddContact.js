import { React, useEffect, useState } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
const AddContact = () => {
  const [userdetails, setuserdetails] = useState({
    name: "",
    phone_number: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setuserdetails({ ...userdetails, [name]: value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <center>
        <h2>Create your contact</h2>
      </center>

      <form class="from" onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Name Of Person
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={userdetails.name}
            onChange={handleInputChange}
            placeholder="Hamza"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneInput" className="form-label mt-4">
            Phone Number Of Person
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneInput"
            name="phone_number"
            value={userdetails.phone_number}
            onChange={handleInputChange}
            placeholder="+923354303496"
            required
          />
        </div>
        <input
          type="submit"
          value="Add Contact"
          className="btn btn-info my-2"
        />
      </form>
      <Footer />
    </>
  );
};

export default AddContact;

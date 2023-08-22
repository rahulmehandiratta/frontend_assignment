import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./form.css"

function App() {
  const [Data, setData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    passport: "",
    email: "",
    number: "",
    country: "",
    pinCode: "",
    address: "",
    state: "",
    city: "",
    applications: [],
  });

  const genderOptions = ["Male", "Female", "Other"];

  const passportOptions = ["Yes", "No"];

  const CountryOptions = ["india", "USA", "DUBAI", "Others"];

  //it will update Data state when any input fields are changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //it will add an  empty work exp object by
  //spreading the previous state and adding new object to array
  const handleAddapplication = () => {
    setData((prevData) => ({
      ...prevData,
      applications: [
        ...prevData.applications,
        {
          university: "",
          course: "",
          tutionFees: "",
          applicationCountry: "",
          applicationFees: "",
        },
      ],
    }));
  };

  //using this to delete the entry of particular index
  const handleDeleteApplication = (index) => {
    setData((prevData) => ({
      ...prevData,
      applications: prevData.applications.filter((_, i) => i !== index),
    }));
  };

  //It creates a copy of the experiences array, updates the specified field of the specified entry, and then sets the modified array back to the state.
  const handleEditApplication = (index, field, value) => {
    setData((prevData) => {
      const updatedexperiences = [...prevData.applications];
      updatedexperiences[index][field] = value;
      return { ...prevData, experiences: updatedexperiences };
    });
  };

  //it is used to send the data to the backend by using a particular route
  const handleSubmit = async (e) => {
    console.log(Data);
    try {
      const response = await fetch("http://localhost:5000/registers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Data),
      });
      // Handle response as needed
      console.log("Response:", response);

      alert("Employee Registration successful!");
    } catch (error) {
      alert("Employee Registration failed. fill all the details carefully");
    }
  };

  return (
    <div className="App">
      <h1>Student Registration Form</h1>
      <Form onSubmit={handleSubmit} className="registration-form" style={{alignContent:"left"}}>
        <div className="name">
          <Form.Label>Name:</Form.Label>
          <input
            style={{marginLeft:"10px"}}
            type="text"
            name="name"
            value={Data.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="name">
          <Form.Label>Date of Birth</Form.Label>
          <input
            style={{marginLeft:"10px"}}
            type="date"
            name="dateOfBirth"
            value={Data.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="gender">
          <Form.Label>Gender:</Form.Label>
          <select
          style={{marginLeft:"10px"}}
            name="gender"
            value={Data.gender}
            required
            onChange={handleChange}
          >
            <option value="">Select</option>
            {genderOptions.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div className="passport">
          <Form.Label>Passport:</Form.Label>
          <select
          style={{marginLeft:"10px"}}
            name="passport"
            value={Data.passport}
            required
            onChange={handleChange}
          >
            <option value="">Select</option>
            {passportOptions.map((passport, index) => (
              <option key={index} value={passport}>
                {passport}
              </option>
            ))}
          </select>
        </div>

        <div className="number">
          <Form.Label>Mobile Number:</Form.Label>
          <input
          style={{marginLeft:"10px"}}
            type="mobile"
            name="number"
            value={Data.number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="country">
          <Form.Label>Country:</Form.Label>
          <select
          style={{marginLeft:"10px"}}
            name="country"
            value={Data.country}
            required
            onChange={handleChange}
          >
            <option value="">Select</option>
            {CountryOptions.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="state">
          <Form.Label>State:</Form.Label>
          <input
          style={{marginLeft:"10px"}}
            type="text"
            name="state"
            value={Data.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="city">
          <Form.Label>City:</Form.Label>
          <input
          style={{marginLeft:"10px"}}
            type="text"
            name="city"
            value={Data.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="email">
          <Form.Label>email:</Form.Label>
          <input
          style={{marginLeft:"10px"}}
            type="email"
            name="email"
            value={Data.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="address">
          <Form.Label>Address:</Form.Label>
          <input
          style={{marginLeft:"10px"}}
            type="text"
            name="address"
            value={Data.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="application">
          <h2>Applications</h2>
          <table>
            <tbody>
              {Data.applications.map((workExp, index) => (
                <tr key={index}>
                  <td>
                    <div className="applicationCountry">
                      <Form.Label style={{marginLeft:"50px"}}>Country:</Form.Label>
                      <select
                      style={{marginLeft:"10px"}}
                        name="applicationCountry"
                        value={workExp.applicationCountry}
                        required
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        {CountryOptions.map((applicationCountry, index) => (
                          <option key={index} value={applicationCountry}>
                            {applicationCountry}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td>
                    <input
                    style={{marginLeft:"10px"}}
                      className="university"
                      type="text"
                      value={workExp.university}
                      onChange={(e) =>
                        handleEditApplication(
                          index,
                          "university",
                          e.target.value
                        )
                      }
                      placeholder="University"
                    />
                  </td>
                  <td>
                    <input
                      className="tutionFees"
                      style={{marginLeft:"10px"}}
                      type="Number"
                      value={workExp.tutionFees}
                      onChange={(e) =>
                        handleEditApplication(
                          index,
                          "tutionFees",
                          e.target.value
                        )
                      }
                      placeholder="Tution Fees"
                    />
                  </td>

                  <td>
                    <input
                      className="applicationFees"
                      style={{marginLeft:"10px"}}
                      type="Number"
                      value={workExp.applicationFees}
                      onChange={(e) =>
                        handleEditApplication(
                          index,
                          "applicationFees",
                          e.target.value
                        )
                      }
                      placeholder="Application Fees"
                    />
                  </td>
                  <td>
                    <input
                      style={{marginLeft:"10px"}}
                      className="course"
                      type="text"
                      value={workExp.course}
                      onChange={(e) =>
                        handleEditApplication(index, "course", e.target.value)
                      }
                      placeholder="Course"
                    />
                  </td>

                  <td>
                    <Button
                      onClick={() => handleDeleteApplication(index)}
                      className="delbutton"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Form>
      <Button onClick={handleAddapplication} className="addexp">
        Add Application
      </Button>
      <Button onClick={handleSubmit} style={{marginLeft:"10px"}} className="submit">
        Submit
      </Button>

      <Link to="/data" style={{marginLeft:"10px"}}>Data</Link>
    </div>
  );
}

export default App;

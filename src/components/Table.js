import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  const [userData, setUserData] = useState([]);
  const [userID, setUserId] = useState("");
  const [appID, setAppId] = useState("");

  const CountryOptions = ["india", "USA", "DUBAI", "Others"];

  function TestsFunction() {
    var T = document.getElementById("updateDiv");
    T.style.display = "None"; // <-- Set it to block
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/getuser")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function editFun(
    userId,
    applicationId,
    course,
    university,
    applicationCountry,
    applicationFees,
    tutionFees
  ) {
    var T = document.getElementById("updateDiv");
    T.style.display = "block"; // <-- Set it to block

    var courseElm = document.getElementById("course");
    var courseElm1 = document.getElementById("university");
    var courseElm2 = document.getElementById("applicationFees");
    var courseElm3 = document.getElementById("applicationCountry");
    var courseElm4 = document.getElementById("tutionFees");
    courseElm.value = course;
    courseElm1.value = university;
    courseElm2.value = applicationFees;
    courseElm3.value = applicationCountry;
    courseElm4.value = tutionFees;

    setUserId(userId);
    setAppId(applicationId);

  }


  const divStyle = {
    border: "2px solid #000", // Add your desired border style
    height: "100px",
    widht: "500px",
    display: "none",
    margin: "auto 50px auto 50px",
    boxShadow: "10px 20px 40px rgba(0, 0, 0, 0.2)",
    position: "absolute",
    right: "0",
    left: "0",
    top: "0",
    bottom: "0",
    zindex: "100",
    background: "white",
  };

  function deleteFun(userId, applicationId) {
    axios
      .delete(`http://localhost:5000/userdelete/${userId}/${applicationId}`)
      .then((response) => {
        window.location.reload(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function UpdateFun() {

    var courseElm = document.getElementById("course");
    var courseElm1 = document.getElementById("university");
    var courseElm2 = document.getElementById("applicationFees");
    var courseElm3 = document.getElementById("applicationCountry");
    var courseElm4 = document.getElementById("tutionFees");

 
 var  jsonobject = {
            "university": courseElm1.value,
            "course":    courseElm.value,
            "tutionFees":  courseElm4.value,
            "applicationCountry":  courseElm3.value,
            "applicationFees": courseElm2.value,
            "_id": appID
          }

          const apiUrl = `http://localhost:5000/useredit/${userID}/${appID}`;
          axios.put(apiUrl, jsonobject, {
            headers: {
              'Content-Type': 'application/json', // Set the content type to JSON
              // You may need to add other headers here if required.
            },
          })
            .then((response) => {
                window.location.reload(true);
            })
            .catch((error) => {
              // Handle any errors that occurred during the request.
              console.error('Error:', error);
            });

   
  }

  return (
    <div className="container">
      <Table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Application Country</th>
            <th>University</th>
            <th>Course</th>
            <th>Tuition Fees</th>
            <th>Application Fees</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item, index) => (
            <tr key={index}>
              {/* {console.log(item.application.course)} */}
              <td>{item.name}</td>
              <td>{item.applications.applicationCountry}</td>
              <td>{item.applications.university}</td>
              <td>{item.applications.course}</td>
              <td>{item.applications.tutionFees}</td>
              <td>{item.applications.applicationFees}</td>
              <td>
                <button
                  onClick={() =>
                    editFun(
                      item._id,
                      item.applications._id,
                      item.applications.course,
                      item.applications.university,
                      item.applications.applicationCountry,
                      item.applications.applicationFees,
                      item.applications.tutionFees
                    )
                  }
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => deleteFun(item._id, item.applications._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={divStyle} id="updateDiv">
        <td>
          <div className="applicationCountry">
            <Form.Label style={{ marginLeft: "50px" }}>Country:</Form.Label>
            <select
              style={{ marginLeft: "10px" }}
              name="applicationCountry"
              id="applicationCountry"
              // value={workExp.applicationCountry}
              required
              // onChange={handleChange}
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
            style={{ marginLeft: "10px" }}
            className="university"
            id="university"
            type="text"
            //   value={workExp.university}

            placeholder="University"
          />
        </td>

        <td>
          <input
            style={{ marginLeft: "10px" }}
            id="course"
            className="course"
            type="text"
            //   value={workExp.course}
            placeholder="Course"
          />
        </td>

        
        <td>
          <input
            className="tutionFees"
            id="tutionFees"
            style={{ marginLeft: "10px" }}
            type="Number"
            //   value={workExp.tutionFees}
            placeholder="Tution Fees"
          />
        </td>

        <td>
          <input
            className="applicationFees"
            id="applicationFees"
            style={{ marginLeft: "10px" }}
            type="Number"
            //   value={workExp.applicationFees}
            placeholder="Application Fees"
          />
        </td>
       

        <td>
          <Button
            className="editbutton"
            onClick={() => UpdateFun()}
          >
            Update
          </Button>
        </td>
        <td>
          <Button className="delbutton" onClick={() => TestsFunction()}>
            Cancel
          </Button>
        </td>
      </div>
    </div>
  );
}
export default App;

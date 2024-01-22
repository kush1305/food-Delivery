import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [creden,setCreden]= useState([{email:"",password:""}])
  let navigate = useNavigate();
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: creden.email, password: creden.password})
        });

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials");
        }
        if (json.success) {
          localStorage.setItem("userEmail",creden.email)
          localStorage.setItem("authToken",json.authtoken)
          console.log(localStorage.getItem("authToken"))
          navigate("/")
      }

    } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error as needed, e.g., show a user-friendly error message
    }
}
const handleChange=(e)=>{
 setCreden({...creden,[e.target.name]:e.target.value});

}
  return (
    <>
    <div className="container">
    <form onSubmit={handleSubmit} >
      
      <div className="form-group m-5">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          name="email"
          aria-describedby="emailHelp"
          value={creden.email}
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group m-5">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={creden.password}
          name="password"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary m-5">
        Submit
      </button>
    </form>
  </div>
</>
  )
}

import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {useCart } from "./componentReducer";


export default function Navbar() {
  let data = useCart();

  const navigate= useNavigate();

  const handlelogout=()=>{
    localStorage.removeItem("authToken");
    navigate('/login')
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">
      Reddy
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item ">
          <Link className="nav-link " aria-current="page" to="/">
            Home
          </Link>
        </li>

        {localStorage.getItem("authToken")?(
        <li className="nav-item ">
          <Link className="nav-link " aria-current="page" to="/myorders">
            My Orders
          </Link>
        </li>
        ):""}
      </ul>
      

        {!localStorage.getItem("authToken")?(
          <div className='d-flex'>
          <Link className="btn bg-white text-success mx-1" to="/login">
          Login
        </Link>

        <Link className="btn bg-white text-success mx-1" to="/signup">
          Signup
        </Link>
        </div>
        ):(
          <div className='d-flex'>
          
          <Link className="btn bg-white text-success mx-1" to='/cart'>
          Cart
          <img src={require("../Assests/favicon-16x16.png")} className='mx-1' alt='cart'/>
          {data.length}
          
        </Link>
        <div className="btn bg-white text-success mx-1" onClick={handlelogout}>
          
          Log out
        
        </div>
        </div>
        )}
      
        
    </div>
  </div>
</nav>

    </div>
  )
}

import React, { useEffect, useState } from 'react'

import Footer from "../components/footer";
import Card from '../components/Card';




export default function Home() {
  const [search, setsearch] = useState([]);

  const [foodI, setfoodI] = useState([]);
  const [foodCat, setfoodCat] = useState([]);

  const loadData = async () => {
    const response = await fetch('http://localhost:5000/api/foodData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }


    })

    const json = await response.json();
    setfoodCat(json[1]);
    setfoodI(json[0]);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  })





  return (
    <div>
      

      {/* we can't send data  from childeren to parent  thats why we writing whole code here for Carousel*/}
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}

        >
          <div className="carousel-caption d-none d-md-block" style={{ zIndex: 10 }}>

            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e)=>{
                setsearch(e.target.value)
              }}
            />
            </div>
          <div className="carousel-inner" id="carousel">

            <div className="carousel-item active" >
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pizza"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div></div>
      <div className='container'>
        {
          foodCat.length !== 0 ? (
            foodCat.map((data) => (
              <div className='row mb-3'>
                <div key={data._id} className='fs-5 m-2'>
                  {data.CategoryName}
                </div>
                <hr />
                {foodI.length !== 0 ? (
                  // here we are using filtering fuction to filter item based on smae CategoryName and whatever typed in the search bar .
                  // In second conditions we used includesfunction to get the data && (item.name.toLowerCase().includes(search.toLowerCase()))
                  foodI.filter((item) => (item.CategoryName === data.CategoryName)).map((filterItem) => {
                    return (
                      <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>

                        <Card foodItem={filterItem} 
                          options={filterItem.options[0]} />
                      </div>

                    )
                  })) : null
                }


              </div>
            ))
          ) : null
        }

      </div>

      <div><Footer /></div>
    </div>
  )
}

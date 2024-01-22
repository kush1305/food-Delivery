import React, { useState,useRef, useEffect } from "react";
import { useDispatchCart,useCart } from "./componentReducer";
const image = require("../Assests/favicon-16x16.png")

export default function Card(props) {

  const priceRef =useRef();

  let dispatch = useDispatchCart();
  let data = useCart();

  let options = props.options;
  let priceOption = Object.keys(options)
  const [qty,setQty] = useState(1)
  const [size,setSize] = useState("")

  const handleCart = async () => {
    let food = [];
  
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
  
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
      } else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
      }
    } else {
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
    }
  };
  

  let finalPrice = qty *parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div>
      <div className="card m-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={props.foodItem.img} className="card-img-top" style={{ "objectFit": "contain", "aspectRatio": "2" }} alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text form-text">
            {props.foodItem.description}
          </p>
          <div className="conatiner w-100">
            <select className="m-2 h-100  bg-success rounded" onChange={(e)=>{setQty(e.target.value)}}>
              {Array.from(Array(5), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>

            <select className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
              {priceOption.map((data) => {
                return (
                  <option key={data} value={data}>{data}</option>
                )
              })}
            </select>

            <div className="d-inline h-100 fs-5"> ${finalPrice}/-</div>

          </div>
          <div>
           <button> <img src={image} onClick={handleCart} className='mx-1' alt='cart' /> </button>
          </div>

        </div>
      </div>
    </div>
  );
}

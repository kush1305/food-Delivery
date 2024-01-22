import React from "react";
import {useCart ,useDispatchCart } from "./componentReducer";

export default function Cart() {
    let data = useCart();
    let dispatch =useDispatchCart();

    if(data.length===0){
        return(
            <div className="conatiner">The Cart is Empty !</div>
        )
    }
    
    //handleCheckout
    const handleCheckout=async()=>{
      let userEmail= localStorage.getItem("userEmail")

      let response = await fetch("http://localhost:5000/api/orderData",{
        method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
        body:JSON.stringify({
          order_data:data,
          email:userEmail,
          order_date:new Date().toDateString()
        })
      });

      if(response.status===200){
        await dispatch({type:"DROP"})
      }

    }

    
    //total price count using reduce function

    let totalPrice = data.reduce((total,food)=> total+food.price,0);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name </th>
            <th scope="col">Quantity</th>
            <th scope="col">Size</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index)=>{
            
            return(
            <tr>
            <th scope="row">{index+1}</th>
            <td>{item.name}</td>
            <td>{item.qty}</td>
            <td>{item.size}</td>
            <td>{item.price}</td>
            <td><button className="rounded" style={{"font-size":"24px"}} onClick={()=>{dispatch({type:"REMOVE",index:index})}}><i class="fa fa-trash-o"></i></button></td>
          </tr>
            )
          })}
         
        </tbody>
      </table>
      <div className=" fs-5 m-5">
        Total Price : ${totalPrice}/-
      </div>

      <div className="btn fs-5 bg-success text-white m-5" onClick={handleCheckout}> Check out</div>
    </div>
  );
}

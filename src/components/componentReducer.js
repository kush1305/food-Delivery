import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch(action.type){
    case "ADD":
        return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price,img:action.img}]
    case "REMOVE":
       let Arr =[...state]
       //splice function is used to remove the index
          Arr.splice(action.index,1);
        return Arr;
    case "UPDATE":
          console.log("Updating:", action);
          let arr = [...state];
          arr = arr.map((food, index) => {
            if (food.id === action.id) {
              return { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price };
            }
            return food;
          });
          console.log("Updated array:", arr);
          return arr;
    case "DROP":
      let ar=[];
          return ar;
        
        default:
            console.log("Error in Reducer")
  }
 
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);


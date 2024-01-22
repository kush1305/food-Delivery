
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/componentReducer';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import MyOrders from './screens/MyOrders';

function App() {
  return (
    <>
    <CartProvider>
    <Router>
    <div><Navbar /></div>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </div>
    </Router>

    </CartProvider>

    </>
  );
}

export default App;

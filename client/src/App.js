import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);
  return (
    <div className="App">
      {orders.length > 0 ? <h1>GOT DATA FROM API</h1> : <h1>NOT DATA</h1>}
    </div>
  );
}

export default App;

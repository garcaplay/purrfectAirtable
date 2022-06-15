import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [lastFiveOrders, setLastFiveOrders] = useState([]);
  const [revenueTotal, setRevenueTotal] = useState([]);
  const [inProgressOrdersNo, setInProgressOrdersNo] = useState([]);
  const [currentMonthOrdersNo, setCurrentMonthOrdersNo] = useState([]);
  const [totalOrdersNo, setTotalOrdersNo] = useState([]);
  useEffect(() => {
    fetch("/orders_new")
      .then((res) => res.json())
      .then((data) => {
        setLastFiveOrders(data);
      });
    fetch("/revenue_total")
      .then((res) => res.json())
      .then((data) => {
        setRevenueTotal(data.toFixed(2));
      });
    fetch("/orders_inprogress_number")
      .then((res) => res.json())
      .then((data) => {
        setInProgressOrdersNo(data);
      });
    fetch("/orders_month_number")
      .then((res) => res.json())
      .then((data) => {
        setCurrentMonthOrdersNo(data);
      });
    fetch("/orders_total_number")
      .then((res) => res.json())
      .then((data) => {
        setTotalOrdersNo(data);
      });
  }, []);
  return (
    <div className="App">
      {lastFiveOrders.length > 0 ? (
        <h1>GOT LAST FIVE ORDERS FROM API</h1>
      ) : (
        <h1>NO DATA</h1>
      )}
      <div className="revenue">
        <p className="total_amount">
          Total revenue: {revenueTotal}
          <span className="currency">€</span>
        </p>
      </div>
      <div className="inprogress_orders">
        <p className="inprogress_orders_no">
          Number of orders in progress: {inProgressOrdersNo}
        </p>
      </div>
      <div className="current_month_orders">
        <p className="current_month_orders_no">
          Number of orders this month: {currentMonthOrdersNo}
        </p>
      </div>
      <div className="all_orders">
        <p className="all_orders_no">Total number of orders: {totalOrdersNo}</p>
      </div>
    </div>
  );
}

export default App;

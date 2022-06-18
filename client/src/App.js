import { useEffect, useState } from "react";
import getData from "./services/services";
import StatsList from "./views/statsList";
import LastOrdersList from "./views/lastOrdersList";

function App() {
  const [lastOrders, setLastOrders] = useState([]);
  const [revenueTotal, setRevenueTotal] = useState([]);
  const [inProgressOrdersNo, setInProgressOrdersNo] = useState([]);
  const [currentMonthOrdersNo, setCurrentMonthOrdersNo] = useState([]);
  const [totalOrdersNo, setTotalOrdersNo] = useState([]);
  useEffect(() => {
    getData("/orders_new").then((data) => {
      console.log(data);
      setLastOrders(data);
    });

    getData("/revenue_total").then((data) => {
      setRevenueTotal(data.toFixed(2));
    });
    getData("/orders_inprogress_number").then((data) => {
      setInProgressOrdersNo(data);
    });
    getData("/orders_month_number").then((data) => {
      setCurrentMonthOrdersNo(data);
    });
    getData("/orders_total_number").then((data) => {
      setTotalOrdersNo(data);
    });
  }, []);
  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <h1 className="dashboard_header_title">
          Purrfect Creations' Dashboard
        </h1>
      </header>
      <main className="dashboard_main">
        <div id="stats_container">
          {
            <StatsList
              revenueTotal={revenueTotal}
              inProgressOrdersNo={inProgressOrdersNo}
              currentMonthOrdersNo={currentMonthOrdersNo}
              totalOrdersNo={totalOrdersNo}
            />
          }
        </div>
        <div id="last_orders_container">
          <h2 className="last_orders_title">Recently placed orders</h2>
          {lastOrders.length > 0 ? (
            <LastOrdersList lastOrders={lastOrders} />
          ) : (
            <h2>NO DATA</h2>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

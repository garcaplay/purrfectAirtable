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
  const [errorState, setErrorState] = useState("");
  const [isLoadingStatsState, setIsLoadingStatsState] = useState(true);
  const [isLoadingOrdersState, setIsLoadingOrdersState] = useState(true);

  useEffect(() => {
    getData(`/orders_new/${6}`)
      .then((data) => {
        console.log(data);
        setLastOrders(data);
      })
      .catch((err) => {
        setErrorState(
          "Could not retrieve recent orders, please try again later."
        );
        console.log(JSON.stringify(err));
      })
      .finally(() => {
        setIsLoadingOrdersState(false);
      });

    getData("/revenue_total")
      .then((data) => {
        setRevenueTotal(data.toFixed(2));
      })
      .catch((err) => {
        setErrorState(
          "Could not retrieve total revenue, please try again later."
        );
        console.log(JSON.stringify(err));
      })
      .finally(() => {
        if (isLoadingStatsState) {
          setIsLoadingStatsState(false);
        }
      });
    getData("/orders_inprogress_number")
      .then((data) => {
        setInProgressOrdersNo(data);
      })
      .catch((err) => {
        setErrorState(
          "Could not retrieve number of orders in progress, please try again later."
        );
        console.log(JSON.stringify(err));
      })
      .finally(() => {
        if (isLoadingStatsState) {
          setIsLoadingStatsState(false);
        }
      });
    getData("/orders_month_number")
      .then((data) => {
        setCurrentMonthOrdersNo(data);
      })
      .catch((err) => {
        setErrorState(
          "Could not retrieve number of orders on current month, please try again later."
        );
        console.log(JSON.stringify(err));
      })
      .finally(() => {
        if (isLoadingStatsState) {
          setIsLoadingStatsState(false);
        }
      });
    getData("/orders_total_number")
      .then((data) => {
        setTotalOrdersNo(data);
      })
      .catch((err) => {
        setErrorState(
          "Could not retrieve total number of orders, please try again later."
        );
        console.log(JSON.stringify(err));
      })
      .finally(() => {
        if (isLoadingStatsState) {
          setIsLoadingStatsState(false);
        }
      });
  }, []);
  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <div className={`error_bar ${errorState !== "" ? "error" : ""}`}>
          {errorState}
        </div>
        <h1 className="dashboard_header_title">
          Purrfect Creations' Dashboard
        </h1>
      </header>
      <main className="dashboard_main">
        <div id="stats_container">
          {isLoadingStatsState ? (
            <p>Loading...</p>
          ) : (
            <StatsList
              revenueTotal={revenueTotal}
              inProgressOrdersNo={inProgressOrdersNo}
              currentMonthOrdersNo={currentMonthOrdersNo}
              totalOrdersNo={totalOrdersNo}
            />
          )}
        </div>
        <div id="last_orders_container">
          <h2 className="last_orders_title">Recently placed orders</h2>
          {!isLoadingOrdersState && lastOrders.length > 0 ? (
            <LastOrdersList lastOrders={lastOrders} />
          ) : (
            <h2>
              {isLoadingOrdersState
                ? "Loading..."
                : "THERE ARE NO RECENT ORDERS TO SHOW"}
            </h2>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

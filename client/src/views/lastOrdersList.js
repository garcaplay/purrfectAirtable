import LastOrdersItem from "./lastOrdersItem";
export default function LastOrdersList(props) {
  const { lastOrders } = props;
  return (
    <ul className="last_orders">
      {lastOrders.map((order) => {
        return <LastOrdersItem order={order} key={order.order_id} />;
      })}
    </ul>
  );
}

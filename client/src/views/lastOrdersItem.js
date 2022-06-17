export default function LastOrdersItem({ order }) {
  return (
    <li className="last_orders_item">
      <article>
        <h2>{order.product_name}</h2>
        <div>
          <p>{order.order_id}</p>
          <p>{order.order_status}</p>
        </div>
        <div>
          <p>Price :</p>
          <p>
            {order.price.toFixed(2)}
            <span> €</span>
          </p>
        </div>
        <div>
          <p>Client :</p>
          <p>
            {order.first_name} {order.last_name}
          </p>
        </div>
        <div>
          <p>Address :</p>
          <p>{order.address}</p>
        </div>
        <div>
          <p>Contact :</p>
          <p>{order.email}</p>
        </div>
      </article>
    </li>
  );
}

export default function LastOrdersItem({ order }) {
  return (
    <li className="last_orders_item">
      <article className="item">
        <div className="item_header">
          <h3 className="item_name">{order.product_name}</h3>
          <div>
            <p className="item_id">#{order.order_id}</p>
            <p className={`item_status ${order.order_status}`}>
              {order.order_status.replaceAll("_", " ")}
            </p>
          </div>
        </div>
        <div className="item_body">
          <div className="item_body_section">
            <p>Price:</p>
            <p>
              {order.price.toFixed(2)}
              <span> €</span>
            </p>
          </div>
          <div className="item_body_section">
            <p>Client:</p>
            <p>
              {order.first_name} {order.last_name}
            </p>
          </div>
          <div className="item_body_section">
            <p>Address:</p>
            <p>{order.address}</p>
          </div>
          <div className="item_body_section">
            <p>Contact:</p>
            <p>{order.email}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

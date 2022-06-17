export default function StatsList(props) {
  const {
    revenueTotal,
    inProgressOrdersNo,
    currentMonthOrdersNo,
    totalOrdersNo,
  } = props;
  return (
    <ul className="stats_container">
      <li className="stats_item">
        <article>
          <div className="stats_value">
            <p className="stats_revenue">
              {revenueTotal}
              <span className="currency">€</span>
            </p>
          </div>
          <div className="stats_label">
            <p>Total revenue</p>
          </div>
        </article>
      </li>
      <li className="stats_item">
        <article>
          <div className="stats_value">
            <p className="stats_inprogress">{inProgressOrdersNo}</p>
          </div>
          <div className="stats_label">
            <p>Status "In Progress"</p>
          </div>
        </article>
      </li>
      <li className="stats_item">
        <article>
          <div className="stats_value">
            <p className="stats_current_month_no">{currentMonthOrdersNo}</p>
          </div>
          <div className="stats_label">
            <p>Orders this month</p>
          </div>
        </article>
      </li>
      <li className="stats_item">
        <article>
          <div className="stats_value">
            <p className="stats_total_no">{totalOrdersNo}</p>
          </div>
          <div className="stats_label">
            <p>Total orders</p>
          </div>
        </article>
      </li>
    </ul>
  );
}

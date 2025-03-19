
const TopSellingProducts = () => {
  // Example data for top-selling products
  const products = [
    { id: 1, name: "Wireless Headphones", sales: 120, revenue: "$3,600" },
    { id: 2, name: "Smartwatch", sales: 95, revenue: "$4,750" },
    { id: 3, name: "Bluetooth Speaker", sales: 80, revenue: "$2,400" },
    { id: 4, name: "Gaming Mouse", sales: 75, revenue: "$1,875" },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Top Selling Products</h4>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {products.map((product) => (
            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{product.name}</h5>
                <small className="text-muted">{product.sales} units sold</small>
              </div>
              <span className="badge bg-primary rounded-pill">{product.revenue}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopSellingProducts;

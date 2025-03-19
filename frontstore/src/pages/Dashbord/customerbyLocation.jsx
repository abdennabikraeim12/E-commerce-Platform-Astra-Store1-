import "./customer.css"
const CustomersByLocation = ({ locations }) => {
  return (
    <div className="card shadow-sm border-0 customers-by-location">
      <div className="card-body">
        <h5 className="card-title text-uppercase font-weight-bold">
          Customers By Location
        </h5>
        <ul className="list-unstyled mb-0">
          {locations.map((location, index) => (
            <li key={index} className="d-flex justify-content-between align-items-center mb-2">
              <div className="text-left">
                <h6 className="mb-1 font-weight-bold">{location.city}</h6>
                <p className="mb-0 text-muted">{location.country}</p>
              </div>
              <div className="text-right">
                <span className="badge bg-primary">{location.customers} Customers</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

CustomersByLocation.defaultProps = {
  locations: [
    { city: 'New York', country: 'USA', customers: 1250 },
    { city: 'London', country: 'UK', customers: 875 },
    { city: 'Paris', country: 'France', customers: 650 },
  ],
};

export default CustomersByLocation;

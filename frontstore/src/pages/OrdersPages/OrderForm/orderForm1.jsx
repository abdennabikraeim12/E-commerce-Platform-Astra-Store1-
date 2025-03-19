import { useState } from "react";
import "./orderform.css"; // Import custom CSS for styling and animations
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function OrderForm1() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <section role="main" className="content-body content-body-modern mt-0">
      <header className="page-header page-header-left-inline-breadcrumb">
        <h2 className="font-weight-bold text-6 animate-fade-in">Order #6927 Details</h2>
        <div className="right-wrapper animate-slide-in">
          <ol className="breadcrumbs">
            <li><span>Home</span></li>
            <li><span>eCommerce</span></li>
            <li><span>Orders</span></li>
          </ol>
        </div>
      </header>
      
      <form className="order-details action-buttons-fixed animate-zoom-in" method="post">
        <div className="row">
          <div className="col-xl-4 mb-4 mb-xl-0">
            <div className="card card-modern animate-slide-in">
              <div className="card-header"><h2 className="card-title">General</h2></div>
              <div>
 
  <div className="card-body">
    <div className="form-row">
      <div className="form-group col mb-3">
        <label>Status</label>
        <select className="form-control form-control-modern" name="orderStatus" required>
          <option value="on-hold" selected>On Hold</option>
          <option value="pending">Pending Payment</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col mb-3">
        <label>Date Created</label>
        <div className="date-time-field">
        <div className="date">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="Pp"
                            className="form-control form-control-modern"
                          />
                        </div>
          
        </div>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col mb-3">
        <label>Customer</label>
        <select className="form-control form-control-modern" name="orderCustomer" required data-plugin-selecttwo>
          <option value={21} selected>ayman dimassi</option>
          <option value={33}>Monica </option>
          <option value={55}>kenan kraeim</option>
          <option value={60}>aycha </option>
        </select>
      </div>
    </div>
  </div>
</div>

            </div>
          </div>
          
         <div className="col-xl-8">
  <div className="card card-modern">
    <div className="card-header">
      <h2 className="card-title">Addresses</h2>
    </div>
    <div className="card-body">
      <div className="row">
        <div className="col-xl-auto me-xl-5 pe-xl-5 mb-4 mb-xl-0">
          <h3 className="text-color-dark font-weight-bold text-4 line-height-1 mt-0 mb-3">BILLING</h3>
          <ul className="list list-unstyled list-item-bottom-space-0">
            <li>Street Name Example</li>
            <li>1234</li>
            <li>Detroit</li>
            <li>Michigan</li>
            <li>93218</li>
            <li>USA</li>
          </ul>
          <strong className="d-block text-color-dark">Email address:</strong>
          <a href="mailto:johndoe@domain.com">kenankraeim@gmail.com</a>
          <strong className="d-block text-color-dark mt-3">Phone:</strong>
          <a href="tel:+5551234" className="text-color-dark">555-1234</a>
        </div>
        <div className="col-xl-auto ps-xl-5">
          <h3 className="font-weight-bold text-color-dark text-4 line-height-1 mt-0 mb-3">SHIPPING</h3>
          <ul className="list list-unstyled list-item-bottom-space-0">
            <li>Street Name Example</li>
            <li>1234</li>
            <li>Detroit</li>
            <li>Michigan</li>
            <li>93218</li>
            <li>USA</li>
          </ul>
          <strong className="d-block text-color-dark">Email address:</strong>
          <a href="mailto:johndoe@domain.com">elhembouzid@gmail.com</a>
          <strong className="d-block text-color-dark mt-3">Phone:</strong>
          <a href="tel:+5551234" className="text-color-dark">555-1234</a>
        </div>
        
      </div>
      
    </div>
    
  </div>
  
</div>

        </div>

        <div className="row " style={{paddingLeft:"25rem",paddingRight:"25rem"}}>
          <button className="submit-button btn btn-primary animate-bounce" >Save Order</button>
          <button className="cancel-button btn btn-light animate-fade-in">Cancel</button>
          <button className="delete-button btn btn-danger animate-shake">Delete Order</button>
        </div>
      </form>
      
    </section>
  );
}

export default OrderForm1;

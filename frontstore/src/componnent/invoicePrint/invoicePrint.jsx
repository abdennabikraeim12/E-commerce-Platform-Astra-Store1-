import { Navigate } from "react-router-dom";

function InvoicePrint() {

    const handlePrint = () => {
        window.print();
        Navigate('/InvoicePrint')
      };

    return (
    
<div className="invoice">
  <header className="clearfix">
    <div className="row">
      <div className="col-sm-6 mt-3">
        <h2 className="h2 mt-0 mb-1 text-dark font-weight-bold">INVOICE</h2>
        <h4 className="h4 m-0 text-dark font-weight-bold">#76598345</h4>
      </div>
      <div className="col-sm-6 text-end mt-3 mb-3">
                  <address className="ib me-5">
                    Abdennabi Kraeim
                    <br />
                    123 Astra Street, Tunisia, Monastir
                    <br />
                    Phone: +216 58802396
                    <br />
                    AbdennabiKraeim@gmail.com
                  </address>
                  <div className="ib">
                  <img src="img/astra2.png"   style={{width:'150px',height:'60px'}} alt="astra"/>
                  </div>
                </div>
    </div>
  </header>
  <div className="bill-info">
    <div className="row">
      <div className="col-md-6">
        <div className="bill-to">
          <p className="h5 mb-1 text-dark font-weight-semibold">To:</p>
          <address>
                      Ayman
                      <br />
                      121 King Street, Melbourne, Australia
                      <br />
                      Phone: +61 3 8376 6284
                      <br />
                      aymanDimassi@gmail.com
                    </address>
        </div>
      </div>
      <div className="col-md-6">
        <div className="bill-data text-end">
          <p className="mb-0">
            <span className="text-dark">Invoice Date:</span>
            <span className="value">05/20/2023</span>
          </p>
          <p className="mb-0">
            <span className="text-dark">Due Date:</span>
            <span className="value">06/20/2023</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  <table className="table table-responsive-md invoice-items">
    <thead>
      <tr className="text-dark">
        <th id="cell-id" className="font-weight-semibold">#</th>
        <th id="cell-item" className="font-weight-semibold">Item</th>
        <th id="cell-desc" className="font-weight-semibold">Description</th>
        <th id="cell-price" className="text-center font-weight-semibold">Price</th>
        <th id="cell-qty" className="text-center font-weight-semibold">Quantity</th>
        <th id="cell-total" className="text-center font-weight-semibold">Total</th>
      </tr>
    </thead>
    <tbody>
                <tr>
                  <td>123456</td>
                  <td className="font-weight-semibold text-dark">Headphones</td>
                  <td>aAwesome electronic products</td>
                  <td className="text-center">$14.00</td>
                  <td className="text-center">2</td>
                  <td className="text-center">$28.00</td>
                </tr>
                <tr>
                  <td>654321</td>
                  <td className="font-weight-semibold text-dark">Smart TVs</td>
                  <td>Awesome Smart TVs</td>
                  <td className="text-center">$17.00</td>
                  <td className="text-center">1</td>
                  <td className="text-center">$17.00</td>
                </tr>
              </tbody>
  </table>
  <div className="invoice-summary">
    <div className="row justify-content-end">
      <div className="col-sm-4">
        <table className="table h6 text-dark">
          <tbody>
            <tr className="b-top-0">
              <td colSpan={2}>Subtotal</td>
              <td className="text-start">$73.00</td>
            </tr>
            <tr>
              <td colSpan={2}>Shipping</td>
              <td className="text-start">$0.00</td>
            </tr>
            <tr className="h4">
              <td colSpan={2}>Grand Total</td>
              <td className="text-start">$73.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div className="d-grid gap-3 d-md-flex justify-content-md-end me-4">
            <a href="/InvoicePrint" onClick={handlePrint} target="_blank" className="btn btn-primary ms-3"><i className="fas fa-print" /> Print now</a>
 </div>
</div>



    

    );
  }
  
  export default InvoicePrint;
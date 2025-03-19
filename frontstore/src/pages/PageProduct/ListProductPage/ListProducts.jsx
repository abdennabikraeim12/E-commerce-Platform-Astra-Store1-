import Header from "../../../componnent/Header/headerprofil";
import SideBar from "../../../componnent/SideBare/sideBare";
import ListProduct from "../HomeProductPage/ComponentPage/listProduct";
function ListProducts() {
  
  return (
    <body>
      <section className="body">
        {/* start: header */}
        <Header />
        {/* end: header */}
        <div className="inner-wrapper">
          {/* start: sidebar */}
          <aside id="sidebar-left" className="sidebar-left">
            <div className="sidebar-header">
              <SideBar />
            </div>
          </aside>
          {/* end: sidebar */}
          <section
            role="main"
            className="content-body content-body-modern mt-0"
          >
            <header className="page-header page-header-left-inline-breadcrumb">
              <h2 className="font-weight-bold text-6">Products</h2>
              <div className="right-wrapper">
                <ol className="breadcrumbs">
                  <li>
                    <span>Home</span>
                  </li>
                  <li>
                    <span>eCommerce</span>
                  </li>
                  <li>
                    <span>Products</span>
                  </li>
                </ol>
              </div>
            </header>
            {/* start: page */}
            <ListProduct/>
            {/* end: page */}
          </section>
        </div>
       
      </section>
    </body>
  );
}

export default ListProducts;

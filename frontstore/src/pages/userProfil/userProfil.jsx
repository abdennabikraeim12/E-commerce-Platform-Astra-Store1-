
import { useContext, useEffect } from "react";
import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import { FormContext } from "../../componnent/context/AuthContext";
import apiRequest from "../../componnent/axios/axiosInstance";
import InfoProfil from "./ComponentsUserProfil/infoProfil";
import ListFriends from "./ComponentsUserProfil/listFriends";
import LanguageUser from "./ComponentsUserProfil/languageUser";
import UsersReviews from "./ComponentsUserProfil/usersReviews";
import PersonalInformation from "./ComponentsUserProfil/personalInformation";
import TotalSales from "./ComponentsUserProfil/totalSales";
import NewCustomers from "./ComponentsUserProfil/newCustomers";
import NumberOfOrderes from "./ComponentsUserProfil/numberOfOrders";
import UpdateProjects from "./ComponentsUserProfil/updateProjects";
import Messages from "./ComponentsUserProfil/messages";

function UserProfil() {
    const { currentUser,setCustomizationSettings} = useContext(FormContext);
    useEffect(() => {
      const fetchCustomizationSettings = async () => {
        try {
          const userId = currentUser?.data?._id;
          const response = await apiRequest.get(`/customization/get-customise/${userId}`);
    
          if (response.status === 200 && response.data?.data) {    
            localStorage.setItem("customizationSettings", JSON.stringify(response.data.data));
            setCustomizationSettings(response.data.data);
          } 
        } catch (error) {
          console.log(error);
              const localSettings = localStorage.getItem("customizationSettings");
          if (localSettings) {
            setCustomizationSettings(JSON.parse(localSettings));
          }
        }
      };
    
      if (currentUser?.data?._id) {
        fetchCustomizationSettings();
      }
    }, [currentUser]);
  return (
    <section className="body">
      <Header />
      <div className="inner-wrapper">
        {/* start: sidebar */}
        <aside id="sidebar-left" className="sidebar-left">
          <div className="sidebar-header">
            <SideBar />
          </div>
        </aside>
        {/* end: sidebar */}
        <section role="main" className="content-body">
          <header className="page-header">
            <h2>User Profile</h2>
            <div className="right-wrapper text-end">
              <ol className="breadcrumbs">
                <li>
                  <a href="/">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li>
                  <span>Pages</span>
                </li>
                <li>
                  <span>User Profile</span>
                </li>
              </ol>
              <a className="sidebar-right-toggle" data-open="sidebar-right">
                <i className="fas fa-chevron-left" />
              </a>
            </div>
          </header>
          {/* start: page */}
          <div className="row">
            <div className="col-lg-4 col-xl-3 mb-4 mb-xl-0">
              <InfoProfil/>
             <ListFriends/>
              <LanguageUser/>;
            </div>
            <div className="col-lg-8 col-xl-6">
              <div className="tabs">
                <ul className="nav nav-tabs tabs-primary">
                  <li className="nav-item active">
                    <button
                      className="nav-link"
                      data-bs-target="#overview"
                      data-bs-toggle="tab"
                    >
                      Overview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-target="#edit"
                      data-bs-toggle="tab"
                    >
                      Edit
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <UsersReviews/>
                  <PersonalInformation/>
                </div>
              </div>
            </div>
            <div className="col-xl-3">
              <h4 className="mb-3 mt-0 font-weight-semibold text-dark">
                Sale Stats
              </h4>
              <ul className="simple-card-list mb-3">
                <TotalSales/>
               <NumberOfOrderes/>
              <NewCustomers/>
              </ul>
             <UpdateProjects/>
              <Messages/>
            </div>
          </div>
          {/* end: page */}
        </section>
      </div>
    </section>
  );
}

export default UserProfil;

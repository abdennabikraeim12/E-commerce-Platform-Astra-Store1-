import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import UserInfoCard from "./userProfil";
import StatisticsCard from "./statisticCard";
import Header from "../../componnent/Header/headerprofil";
import SideBar from "../../componnent/SideBare/sideBare";
import TopSellingProducts from "./topselling";
import RevenueCard from "./revenuCard";
import CustomersByLocation from "./customerbyLocation";

function Dashboard() {
  const [showConfetti, setShowConfetti] = useState(false);

  // Function to trigger confetti
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Stop after 5 seconds
  };

  return (
    <section className="body">
      {/* Animated Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
          >
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              numberOfPieces={200}
              gravity={0.3}
              colors={["#FF5733", "#33FFBD", "#FFC300", "#DAF7A6", "#900C3F"]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <div className="inner-wrapper">
        <aside id="sidebar-left" className="sidebar-left">
          <SideBar />
        </aside>

        <section role="main" className="content-body content-body-modern">
          <header className="page-header page-header-left-inline-breadcrumb">
            <h2 className="font-weight-bold text-6">Dashboard</h2>
            <div className="right-wrapper">
              <ol className="breadcrumbs">
                <li><span>Home</span></li>
                <li><span>eCommerce Dashboard</span></li>
              </ol>
              <a className="sidebar-right-toggle" data-open="sidebar-right">
                <i className="fas fa-chevron-left" />
              </a>
            </div>
          </header>

          {/* Start: Page */}
          <div className="row">
            <div className="col-lg-12 col-xl-4">
              <UserInfoCard name="Kenan Kraeim" balance="$19,876.02" products="637" />
            </div>
            <div className="col-lg-6 col-xl-12 pb-2 pb-lg-0 mb-4 mb-lg-0">
              <StatisticsCard title="Total Orders" value="4825" trend="UP" />
            </div>
            <div className="col-lg-6 col-xl-12 pt-xl-2 mt-xl-4">
              <StatisticsCard title="Average Price" value="$39.03" trend="DOWN" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-xl-8 pt-2 pt-xl-0 mt-4 mt-xl-0">
              <RevenueCard
                thisMonth="$19,876.02"
                lastMonth="$14,345.26"
                totalProfit="$119,876.02"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 col-xl-4">
              <StatisticsCard title="Total Customers" value="3872" trend="UP" />
            </div>
            <div className="col-lg-6 col-xl-4 pt-2 pt-lg-0 mt-4 mt-lg-0">
              <TopSellingProducts />
            </div>
            <div className="col-lg-12 col-xl-4 pt-2 pt-xl-0 mt-4 mt-xl-0">
              <CustomersByLocation />
            </div>
          </div>

          {/* Button to Trigger Confetti */}
          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={triggerConfetti}>
              Celebrate Milestone
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Dashboard;






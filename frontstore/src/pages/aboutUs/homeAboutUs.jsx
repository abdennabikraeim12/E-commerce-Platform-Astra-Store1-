import { useEffect, useState } from "react";
import Footer from "../../componnent/Footer/footer";
import Header from "../../componnent/Header/headerprofil";

import "./aboutPage.css";
import CompanyHistory from "./companyHistory";
import CompanyInfo from "./companyInfo";
import MissionVission from "./missionVission";
import TeamInfo from "./teamInfo";

function AboutUsPage() {
  const [aboutOptions, setAboutOptions] = useState({});

  useEffect(() => {
    // Récupérer les données de "step3Data" depuis localStorage pour la page "About Us"
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.AboutUs) {
      // Convertir les options sélectionnées en un objet aboutOptions
      const options = step3Data.formSelections.AboutUs.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setAboutOptions(options);
    }
  }, []);

  return (
    <div>
      {/* Affichage conditionnel des composants selon les options sélectionnées */}
      {aboutOptions.Header && <Header />}
      
      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h3 className="text-white display-3 mb-4 wow fadeInDown" data-wow-delay="0.1s">
            About Us
            <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </h3>
          <ol className="breadcrumb justify-content-center mb-0 wow fadeInDown" data-wow-delay="0.3s">
            <li className="breadcrumb-item"><a href="/contactuspage">Contact</a></li>
            <li className="breadcrumb-item"><a href="/faqpage">FAQ</a></li>
            <li className="breadcrumb-item"><a href="/">Astra-Store</a></li>
            <li className="breadcrumb-item active text-primary">About Us</li>
          </ol>
        </div>
      </div>
      {/* Header End */}

      {/* Affichage conditionnel des composants principaux */}
      {aboutOptions.CompanyHistory && <CompanyHistory />}
      {aboutOptions.CompanyInfo && <CompanyInfo />}
      {aboutOptions.TeamInfo && <TeamInfo />}
      {aboutOptions.MissionVission && <MissionVission />}

      {aboutOptions.footer && <Footer />}
    </div>
  );
}

export default AboutUsPage;

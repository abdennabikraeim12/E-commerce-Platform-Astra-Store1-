import { useEffect, useState } from "react";
import Footer from "../../componnent/Footer/footer";
import Header from "../../componnent/Header/headerprofil";
import TeamInfo from "../aboutUs/teamInfo";

import "./pageFQA.css";
import Questions from "./questions";

function FQAPage() {
  const [faqOptions, setFaqOptions] = useState({});

  useEffect(() => {
    // Récupérer les données de "step3Data" depuis localStorage pour la page FAQ
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.FAQ) {
      // Convertir les options sélectionnées en un objet faqOptions
      const options = step3Data.formSelections.FAQ.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setFaqOptions(options);
    }
  }, []);

  return (
    <div>
      {faqOptions.Header && <Header />}
      
      {/* Header Start */}
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: 900 }}>
          <h3 className="text-primary display-3 mb-4 wow">FAQ
            <div className="spinner-grow text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </h3>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><a href="/contactuspage">Contact</a></li>
            <li className="breadcrumb-item"><a href="/aboutuspage">About Us</a></li>
            <li className="breadcrumb-item"><a href="/">Astra-Store</a></li>
            <li className="breadcrumb-item active text-primary">FAQ</li>
          </ol>
          <h2 style={{ color: "white" }}>NOTRE FOIRE AUX QUESTIONS – FAQ</h2>
          <p style={{ color: "white" }}>
            We answer frequently asked questions to our outsourcing company in 
            <span className="breadcrumb-item active">Tunisia</span>
          </p>
        </div>
      </div>
      {/* Header End */}

      {/* Affichage conditionnel des composants principaux */}
      {faqOptions.Questions && <Questions />}
      {faqOptions.TeamInfo && <TeamInfo />}

      {faqOptions.footer && <Footer />}
    </div>
  );
}

export default FQAPage;

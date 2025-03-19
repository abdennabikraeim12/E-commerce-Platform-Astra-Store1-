import Footer from "../../componnent/Footer/footer";
import HeaderStore from "../../componnent/Header/headerStore";
import CompanyInformation from "../pageStore/companyInformation";
import LatestNews from "../pageStore/information";
import Slider from "../pageStore/slider";
import Template from "../pageStore/template";
import VersionAstraStore from "../pageStore/versionAstraStore";


function HomeStore() {
  return (
    <div className="body">
      {/* Composant Header statique */}
      <HeaderStore/>
      {/* Contenu principal */}
      <div role="main" className="main">
        <CompanyInformation/>
        <LatestNews/>
        <Template/>
        <Slider/>
        <VersionAstraStore/>
      </div>

      {/* Composant Footer statique */}
      <Footer/>
    </div>
  );
}

export default HomeStore;


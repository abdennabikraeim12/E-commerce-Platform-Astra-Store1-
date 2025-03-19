import { useEffect, useState } from "react";
import Footer from "../../../componnent/Footer/footer";
import Header from "../../../componnent/Header/headerprofil";
import FormHomeCategory from "../FormCategory/formHomeCategory";
import ListHomeCategory from "../ListCategory/ListHomeCategory";

function HomeCategories() {
  const [homeCategoryOptions, setHomeCategoryOptions] = useState({});

  useEffect(() => {
    // Retrieve "step3Data" from localStorage for homeCategories page
    const step3Data = JSON.parse(localStorage.getItem("step3Data"));
    if (step3Data && step3Data.formSelections?.Categories) {
      // Convert selected options into a homeCategoryOptions object
      const options = step3Data.formSelections.Categories.reduce((acc, item) => {
        acc[item] = true;
        return acc;
      }, {});
      setHomeCategoryOptions(options);
    }
  }, []);

  return (
    <div>

      {/* Conditionally render Header */}
      {homeCategoryOptions.Header && <Header />}

      {/* FormHomeCategory */}
      {homeCategoryOptions.FormCategories && (
        <section className="category-form-section">
          <FormHomeCategory />
        </section>
      )}

      {/* ListHomeCategory */}
      {homeCategoryOptions.ListCategories && (
        <section className="category-list-section">
          <ListHomeCategory />
        </section>
      )}

      {/* Conditionally render Footer */}
      {homeCategoryOptions.footer && <Footer />}
    </div>
  );
}

export default HomeCategories;

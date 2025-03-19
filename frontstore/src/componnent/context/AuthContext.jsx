import { createContext, useEffect, useState } from "react";
import { useCurrentUser } from "./hooksContext/useCurrentUser";
import { useFormData } from "./hooksContext/useFormData";
import { useSelectedOptions } from "./hooksContext/useSelectedOptions";
import pagesConfig from "../../config/pagesConfig";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const { currentUser, setCurrentUser, fetchUser, logout, refreshToken } = useCurrentUser();
  const { formData, updateFormData } = useFormData();
  const { selectedOptions, updatePageOptions } = useSelectedOptions(pagesConfig);
  const [isLoading, setIsLoading] = useState(true); 
  const [customizationSettings, setCustomizationSettings] = useState({
    color: "#f5312b", 
    backgroundColor: "light",
    layout: "standard",
    headerColor: "light",
    sidebarColor: "light",
    sidebarSize: "md",
    menuType: "simple",
  });
  useEffect(() => {
    const loadUser = async () => {
      if (!currentUser) {
        await fetchUser();
      }
      setIsLoading(false); // Fin du chargement
    };

    loadUser();
  }, [fetchUser, currentUser]);

  if (isLoading) {
    return <div>Chargement en cours...</div>; 
  }

  return (
    <FormContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        fetchUser,
        logout,
        refreshToken,
        formData,
        updateFormData,
        selectedOptions,
        updatePageOptions,
        pagesConfig,
        customizationSettings, 
        setCustomizationSettings,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

 



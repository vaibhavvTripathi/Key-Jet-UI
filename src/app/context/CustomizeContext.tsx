import { updateCustomization } from "@/functions/CustomizationFunctions/updateCustomization";
import Customization from "@/models/Customization/Customization";
import defaultCustomization from "@/models/Customization/DefaultCustomization";
import { createContext, useState } from "react";

export interface CustomizeContextType {
    customization: Customization;
    updateCustomization: (updatedCustomization: Customization) => void;
}

export const CustomizeContext = createContext<CustomizeContextType>({
    customization: defaultCustomization,
    updateCustomization: (updatedCustomization: Customization) => {},
});

const CustomizeContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [customization, setCustomization] =
        useState<Customization>(defaultCustomization);

    const handleUpdateCustomization = (updatedCustomization: Customization) => {
        updateCustomization(updatedCustomization, setCustomization);
    };

    const contextValue = {
        customization,
        updateCustomization: handleUpdateCustomization,
    };
    return (
        <CustomizeContext.Provider value={contextValue}>
            {children}
        </CustomizeContext.Provider>
    );
};

export default CustomizeContextProvider;

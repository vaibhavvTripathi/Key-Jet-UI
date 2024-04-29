import Customization from "@/models/Customization/Customization";

export const updateCustomization = (
    updatedCustomization: Customization,
    setCustomization: React.Dispatch<React.SetStateAction<Customization>>
) => {
    setCustomization(updatedCustomization);
};

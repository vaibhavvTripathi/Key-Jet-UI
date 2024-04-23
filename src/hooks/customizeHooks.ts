// useKeyPressSound.ts
import Customization from "@/models/Customization/Customization";
import { useEffect } from "react";

const useKeyPressSound = (customization: Customization) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const { key } = event;
            const keyPressSoundMap =
                customization.soundCustomization.keypressSounds
                    .keyPressSoundMap;
            const defaultSound =
                customization.soundCustomization.keypressSounds.defaultSound;
			
            const soundToPlay = customization.soundCustomization.soundOn
                ? keyPressSoundMap[key] || defaultSound
                : null;
			
            if (soundToPlay) {
                const audio = new Audio(`/KeyPressSounds/${soundToPlay}`);
                audio.play();
                console.log(
                    `Playing sound for key: ${key}, sound: ${soundToPlay}`
                );
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [customization]);
};

export default useKeyPressSound;

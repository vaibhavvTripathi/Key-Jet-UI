import Customization from "./Customization";

const defaultCustomization: Customization = {
    soundCustomization: {
        soundOn: true,
        keypressSounds: {
            keyPressSoundMap: {
                " ": 'space.wav'
            },
            defaultSound: "key.mp3",
        },
    },
    themeCustomization: {},
    avatarCustomization: {},
};

export default defaultCustomization;

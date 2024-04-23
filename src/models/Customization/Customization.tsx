interface Customization {
    soundCustomization: SoundCustomization;
    themeCustomization: ThemeCustomization;
    avatarCustomization: AvatarCustomization;
}

export interface SoundCustomization {
    soundOn: boolean; 
    keypressSounds: {
        keyPressSoundMap: KeyPressSoundMap; 
        defaultSound: string; 
    };
}

export interface KeyPressSoundMap {
    [key: string]: string;
}

export interface AvatarCustomization
{

}

export interface ThemeCustomization
{

}

export default Customization;

import "@peersyst/react-native-components";

declare module "@peersyst/react-native-components" {
    export interface ButtonVariantOverrides {
        primary: true;
        secondary: true;
        tertiary: true;
        quaternary: true;
        contrast: true;
        destructive: true;
        glass: true;
    }
}

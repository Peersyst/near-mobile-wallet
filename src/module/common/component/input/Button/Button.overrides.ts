import "@peersyst/react-native-components";

declare module "@peersyst/react-native-components" {
    export interface ButtonVariantOverrides {
        filled: false;
        primary: true;
        secondary: true;
        tertiary: true;
    }
}

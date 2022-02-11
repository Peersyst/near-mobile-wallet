/* eslint-disable @typescript-eslint/no-empty-interface */
import "@peersyst/react-native-styled";
import { Theme as ExtendedTheme } from "react-native-components";

declare module "@peersyst/react-native-styled" {
    export interface Theme extends ExtendedTheme {}
}

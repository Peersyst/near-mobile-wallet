import { StylesheetProvider as RNSStylesheetProvider } from "@peersyst/react-native-styled";
import stylesheets from "./stylesheets";

export function StylesheetProvider({ children }: { children: React.ReactNode }): JSX.Element {
    return <RNSStylesheetProvider stylesheets={stylesheets}>{children}</RNSStylesheetProvider>;
}

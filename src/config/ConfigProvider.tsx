import { ConfigProvider as GenesysConfigProvider } from "@peersyst/react-native-components";
import { ReactNode } from "react";
import config from "./config";

export interface ConfigProviderProps {
    children?: ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps): JSX.Element => {
    return <GenesysConfigProvider config={{ ...config, translate: (w: string) => w }}>{children}</GenesysConfigProvider>;
};

export default ConfigProvider;

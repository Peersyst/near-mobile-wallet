import { ConfigProvider as GenesysConfigProvider } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import { ReactNode } from "react";
import config from "./config";

export interface ConfigProviderProps {
    children?: ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps): JSX.Element => {
    const translate = useTranslate("error");
    return <GenesysConfigProvider config={{ ...config, translate }}>{children}</GenesysConfigProvider>;
};

export default ConfigProvider;

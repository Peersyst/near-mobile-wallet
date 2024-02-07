import { ConfigProvider as GenesysConfigProvider } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import settingsState from "module/settings/state/SettingsState";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import config from "./config";

export interface ConfigProviderProps {
    children?: ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps): JSX.Element => {
    // const translate = useTranslate("error");
    // const { locale = "en" } = useRecoilValue(settingsState);
    return <GenesysConfigProvider config={{ ...config, locale: "en" }}>{children}</GenesysConfigProvider>;
};

export default ConfigProvider;

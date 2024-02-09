import { Config, ConfigProvider as GenesysConfigProvider } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import settingsState from "module/settings/state/SettingsState";
import { ReactNode, useMemo } from "react";
import { useRecoilValue } from "recoil";
import baseConfig from "./config";

export interface ConfigProviderProps {
    children?: ReactNode;
}

const ConfigProvider = ({ children }: ConfigProviderProps): JSX.Element => {
    const translate = useTranslate("error");
    const { locale = "en" } = useRecoilValue(settingsState);

    const config: Config = useMemo(() => {
        return {
            ...baseConfig,
            locale: locale,
            translate,
        };
    }, [translate, locale]);

    return <GenesysConfigProvider config={config}>{children}</GenesysConfigProvider>;
};

export default ConfigProvider;

import { useTranslate } from "module/common/hook/useTranslate";
import SettingsMenuItem from "../../navigation/SettingsMenuItem/SettingsMenuItem";

const ConnectedSites = (): JSX.Element => {
    const translate = useTranslate();

    return <SettingsMenuItem text={translate("connectedSites")} onPress={() => undefined} />;
};

export default ConnectedSites;

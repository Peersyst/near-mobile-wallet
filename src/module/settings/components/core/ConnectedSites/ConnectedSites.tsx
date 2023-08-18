import { useTranslate } from "module/common/hook/useTranslate";
import SettingsMenuItem from "../../navigation/SettingsMenuItem/SettingsMenuItem";
import { useModal } from "@peersyst/react-native-components";
import ConnectedSitesModal from "module/wallet/component/feedback/ConnectedSitesModal/ConnectedSitesModal";

const ConnectedSites = (): JSX.Element => {
    const translate = useTranslate();
    const { showModal } = useModal();

    return <SettingsMenuItem text={translate("connectedSites")} onPress={() => showModal(ConnectedSitesModal)} />;
};

export default ConnectedSites;

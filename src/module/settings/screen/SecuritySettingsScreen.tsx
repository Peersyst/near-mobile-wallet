import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { Col } from "@peersyst/react-native-components";
import ChangePasscode from "module/settings/components/core/ChangePassCode/ChangePasscode";
import WalletsBackup from "module/settings/components/core/WalletsBackup/WalletsBackup";
import DeleteData from "module/settings/components/core/DeleteData/DeleteData";
import DeleteOneWallet from "module/settings/components/core/DeleteOneWallet/DeleteOneWallet";
import { useTranslate } from "module/common/hook/useTranslate";

const SecuritySettingsScreen = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <BaseSecondaryScreen title={translate("security_settings")} back={true}>
            <Col gap={10}>
                <ChangePasscode />
                <WalletsBackup />
                <DeleteOneWallet />
                <DeleteData />
            </Col>
        </BaseSecondaryScreen>
    );
};

export default SecuritySettingsScreen;

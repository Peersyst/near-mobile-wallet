import { Col, useConfig } from "@peersyst/react-native-components";
import ChangePasscode from "module/settings/components/core/ChangePassCode/ChangePasscode";
import WalletsBackup from "module/settings/components/core/WalletsBackup/WalletsBackup";
import DeleteData from "module/settings/components/core/DeleteData/DeleteData";
import BiometricsSwitch from "module/settings/components/core/BiometricsSwitch/BiometricsSwitch";
import ConnectedSites from "../components/core/ConnectedSites/ConnectedSites";
import ManualAccountImport from "../components/core/ManualAccountImport/ManualAccountImport";

const SecuritySettingsScreen = (): JSX.Element => {
    const enableManualImport = useConfig("enableManualImport");
    return (
        <Col gap={12} style={{ marginTop: 20 }}>
            <BiometricsSwitch />
            <ChangePasscode />
            <ConnectedSites />
            <WalletsBackup />
            {enableManualImport && <ManualAccountImport />}
            <DeleteData />
        </Col>
    );
};

export default SecuritySettingsScreen;

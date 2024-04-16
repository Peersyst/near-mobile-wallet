import { useConfig } from "@peersyst/react-native-components";
import ChangePasscode from "module/settings/components/core/ChangePassCode/ChangePasscode";
import WalletsBackup from "module/settings/components/core/WalletsBackup/WalletsBackup";
import DeleteData from "module/settings/components/core/DeleteData/DeleteData";
import BiometricsSwitch from "module/settings/components/core/BiometricsSwitch/BiometricsSwitch";
import ConnectedSites from "../components/core/ConnectedSites/ConnectedSites";
import ManualAccountImport from "../components/core/ManualAccountImport/ManualAccountImport";
import BaseSettingsTab from "../components/layout/BaseSettingsTab/BaseSettingsTab";

const SecuritySettingsScreen = (): JSX.Element => {
    const enableManualImport = useConfig("enableManualImport");
    return (
        <BaseSettingsTab>
            <BiometricsSwitch />
            <ChangePasscode />
            <ConnectedSites />
            <WalletsBackup />
            {enableManualImport && <ManualAccountImport />}
            <DeleteData />
        </BaseSettingsTab>
    );
};

export default SecuritySettingsScreen;

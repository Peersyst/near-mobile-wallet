import SelectFiat from "../components/core/SelectFiat/SelectFiat";
import SelectLocale from "../components/core/SelectLocale/SelectLocale";
import SelectNetwork from "../components/core/SelectNetwork/SelectNetwork";
import SwitchTheme from "../components/core/SwitchTheme/SwitchTheme";
import BaseSettingsTab from "../components/layout/BaseSettingsTab/BaseSettingsTab";

const GeneralSettingsScreen = (): JSX.Element => {
    return (
        <BaseSettingsTab>
            <SwitchTheme />
            <SelectNetwork />
            <SelectFiat />
            <SelectLocale />
        </BaseSettingsTab>
    );
};

export default GeneralSettingsScreen;

import SelectFiat from "../components/core/SelectFiat/SelectFiat";
import SelectLocale from "../components/core/SelectLocale/SelectLocale";
import SelectNetwork from "../components/core/SelectNetwork/SelectNetwork";
import SwitchTheme from "../components/core/SwitchTheme/SwitchTheme";
import { SettingsScreenContentRoot } from "./SettingsScreen.styles";

const GeneralSettingsScreen = (): JSX.Element => {
    return (
        <SettingsScreenContentRoot>
            <SwitchTheme />
            <SelectNetwork />
            <SelectFiat />
            <SelectLocale />
        </SettingsScreenContentRoot>
    );
};

export default GeneralSettingsScreen;

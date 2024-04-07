import { Col } from "@peersyst/react-native-components";
import SelectFiat from "../components/core/SelectFiat/SelectFiat";
import SelectLocale from "../components/core/SelectLocale/SelectLocale";
import SelectNetwork from "../components/core/SelectNetwork/SelectNetwork";
import SwitchTheme from "../components/core/SwitchTheme/SwitchTheme";

const GeneralSettingsScreen = (): JSX.Element => {
    return (
        <Col gap={12} style={{ marginTop: 20 }}>
            <SwitchTheme />
            <SelectNetwork />
            <SelectFiat />
            <SelectLocale />
        </Col>
    );
};

export default GeneralSettingsScreen;

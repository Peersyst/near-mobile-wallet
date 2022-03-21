import { translate } from "locale";
import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import { Col } from "react-native-components";
import SelectFee from "../components/core/SelectFee/SelectFee";
import SelectFiat from "../components/core/SelectFiat/SelectFiat";
import SelectLocale from "../components/core/SelectLocale/SelectLocale";
import SelectNetwork from "../components/core/SelectNetwork/SelectNetwork";

const GeneralSettingsScreen = ({ navigation }: BottomTabScreenNavigatonProps): JSX.Element => {
    return (
        <BaseSecondaryScreen navigation={navigation} title={translate("general_settings")} back={true}>
            <Col gap={20}>
                <SelectNetwork />
                <SelectFee />
                <SelectFiat />
                <SelectLocale />
            </Col>
        </BaseSecondaryScreen>
    );
};

export default GeneralSettingsScreen;

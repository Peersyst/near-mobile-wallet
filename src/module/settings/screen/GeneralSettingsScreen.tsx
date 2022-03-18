import { translate } from "locale";
import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import { Col } from "react-native-components";
import SelectFee from "../components/core/SelectFee/SelectFee";
import SelectNetwork from "../components/core/SelectNetwork/SelectNetwork";

const GeneralSettingsScreen = ({ navigation }: BottomTabScreenNavigatonProps): JSX.Element => {
    return (
        <BaseSecondaryScreen navigation={navigation} title={translate("general_settings")} back={true}>
            <Col gap={20}>
                <SelectNetwork />
                <SelectFee />
            </Col>
        </BaseSecondaryScreen>
    );
};

export default GeneralSettingsScreen;

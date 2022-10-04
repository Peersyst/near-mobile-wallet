import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import { Col } from "@peersyst/react-native-components";
import SelectFee from "../components/core/SelectFee/SelectFee";
import SelectFiat from "../components/core/SelectFiat/SelectFiat";
import SelectLocale from "../components/core/SelectLocale/SelectLocale";
import SelectNetwork from "../components/core/SelectNetwork/SelectNetwork";
import { useTranslate } from "module/common/hook/useTranslate";

const GeneralSettingsScreen = ({ navigation }: BottomTabScreenNavigatonProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <BaseSecondaryScreen navigation={navigation} title={translate("general_settings")} back={true}>
            <Col gap={10}>
                <SelectNetwork />
                <SelectFee />
                <SelectFiat />
                <SelectLocale />
            </Col>
        </BaseSecondaryScreen>
    );
};

export default GeneralSettingsScreen;

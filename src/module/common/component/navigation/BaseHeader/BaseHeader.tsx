import { Appearance } from "module/common/types";
import { Row } from "../../base/layout/Row";
import { BaseHeaderRoot, SettingsIcon } from "./BaseHeader.styles";
import Notification from "../../display/Notification/Notification";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";
import LogoRow from "../../display/Logos/LogoRow/LogoRow";

export interface HeaderProps {
    appearance?: Appearance;
    showIcons?: boolean;
}

const BaseHeader = ({ appearance = "dark", showIcons = false }: HeaderProps): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    return (
        <BaseHeaderRoot>
            <LogoRow appearance={appearance} />
            {showIcons && (
                <Row gap={10}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Settings")}>
                        <SettingsIcon />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Notifications")}>
                        <Notification />
                    </TouchableWithoutFeedback>
                </Row>
            )}
        </BaseHeaderRoot>
    );
};

export default BaseHeader;

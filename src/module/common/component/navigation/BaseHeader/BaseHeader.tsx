import { PaletteMode } from "react-native-components";
import { Row } from "../../base/layout/Row";
import { BaseHeaderRoot, SettingsIcon } from "./BaseHeader.styles";
import Notification from "../../display/Notification/Notification";
import { StyleProp, TouchableWithoutFeedback, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";
import LogoRow from "../../display/Logos/LogoRow/LogoRow";

export interface BaseHeaderProps {
    appearance?: PaletteMode;
    showIcons?: boolean;
    style?: StyleProp<ViewStyle>;
}

const BaseHeader = ({ appearance = "dark", showIcons = false, style }: BaseHeaderProps): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    return (
        <BaseHeaderRoot style={style}>
            <LogoRow appearance={appearance} />
            {showIcons && (
                <Row gap={16}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Notifications")}>
                        <Notification appearance={appearance} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("Settings")}>
                        <SettingsIcon  />
                    </TouchableWithoutFeedback>
                </Row>
            )}
        </BaseHeaderRoot>
    );
};

export default BaseHeader;

import { TouchableHighlightProps, ViewStyle } from "react-native";
import SettingsCard from "../../display/SettingsCard/SettingsCard";
import { SettingsTouchableCardRoot } from "./SettingsTouchableCard.styles";

type SettingsTouchableCardProps = TouchableHighlightProps & {
    cardStyle?: ViewStyle;
};

const SettingsTouchableCard = ({ children, cardStyle, ...rest }: SettingsTouchableCardProps) => {
    return (
        <SettingsTouchableCardRoot {...rest}>
            <SettingsCard style={cardStyle}>{children}</SettingsCard>
        </SettingsTouchableCardRoot>
    );
};

export default SettingsTouchableCard;

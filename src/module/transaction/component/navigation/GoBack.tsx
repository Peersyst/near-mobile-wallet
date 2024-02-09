import styled from "@peersyst/react-native-styled";
import { BackIcon } from "icons";
import useNavigation from "module/common/hook/useNavigation";
import { Pressable, ViewStyle } from "react-native";
import { IconButton, Typography } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";

const GoBackRoot = styled(Pressable)(() => ({
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
}));

export const BackIconRoot = styled(IconButton)(() => ({
    fontSize: 12,
    marginRight: 10,
}));

export interface GoBackProps {
    onBack?: () => unknown;
    style?: ViewStyle;
}

const GoBack = ({ onBack, style }: GoBackProps): JSX.Element => {
    const navigation = useNavigation();
    const translate = useTranslate();
    const goBack = () => {
        if (onBack) onBack();
        else if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };
    return (
        <GoBackRoot onPress={goBack} style={style}>
            <BackIconRoot>
                <BackIcon />
            </BackIconRoot>
            <Typography variant="body3Regular" textTransform="uppercase">
                {translate("go_back")}
            </Typography>
        </GoBackRoot>
    );
};

export default GoBack;

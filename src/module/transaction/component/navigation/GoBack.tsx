import styled from "@peersyst/react-native-styled";
import { BackIcon } from "icons";
import { translate } from "locale";
import useNavigation from "module/common/hook/useNavigation";
import { Pressable } from "react-native";
import { IconButton, Typography } from "react-native-components";

const GoBackRoot = styled(Pressable)(() => ({
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
}));

export const BackIconRoot = styled(IconButton)(() => ({
    fontSize: 15,
    marginRight: 10,
}));

const GoBack = (): JSX.Element => {
    const navigation = useNavigation();
    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };
    return (
        <GoBackRoot onPress={goBack}>
            <BackIconRoot>
                <BackIcon />
            </BackIconRoot>
            <Typography variant={"h3"} textTransform="uppercase">
                {translate("go_back")}
            </Typography>
        </GoBackRoot>
    );
};

export default GoBack;

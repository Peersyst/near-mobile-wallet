import { translate } from "locale";
import { Col, Animated } from "react-native-components";
import { Text, View } from "react-native";
import { ArrowIcon } from "icons";
import { useAuth } from "module/auth/hook/useAuth";
import styled from "@peersyst/react-native-styled";
import { lighten } from "@peersyst/react-utils";
import Button from "module/common/component/input/Button/Button";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import { useState } from "react";

const CustomText = styled(Text)(({ theme }) => ({ color: theme.palette.text }));

const CustomView = styled(View)(({ theme }) => ({
    backgroundColor: lighten(theme.palette.gold, 0.5),
    height: 40,
    alignItems: "center",
    justifyContent: "center",
}));

const AnimatedButton = Animated.createAnimatedComponent.slide(Button, { direction: "left" });

const HomePage = (): JSX.Element => {
    const { logout } = useAuth();

    const [visible, setVisible] = useState(false);

    return (
        <BasePage appearance="light" showIcons>
            <Col gap={10}>
                <CustomView>
                    <CustomText>{translate("name")}</CustomText>
                </CustomView>
                <AnimatedButton in={visible} appearance="dark" leftIcon={<ArrowIcon />} onPress={() => logout()} duration={500}>
                    <Text>Log out</Text>
                </AnimatedButton>
                <Button onPress={() => setVisible(!visible)}>Toggle visible</Button>
            </Col>
        </BasePage>
    );
};

export default HomePage;

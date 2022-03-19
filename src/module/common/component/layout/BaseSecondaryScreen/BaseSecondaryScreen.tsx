import styled from "@peersyst/react-native-styled";
import BaseMainScreen, { BaseMainScreenProps } from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import { ScrollView } from "react-native";
import { Col } from "../../base/layout/Col";
import CardBackgroundWrapper from "../../surface/CardBackgroundWrapper/CardBackgroundWrapper";

export type BaseSecondaryScreenProps = Partial<BottomTabScreenNavigatonProps> & Omit<BaseMainScreenProps, "onBack">;

const ContentRoot = styled(Col)(() => ({
    paddingHorizontal: "5%",
    paddingBottom: 40,
}));

const BaseSecondaryScreen = ({ children, title, back, navigation }: BaseSecondaryScreenProps): JSX.Element => {
    const handleBack = () => {
        if (navigation && navigation.canGoBack()) {
            navigation.goBack();
        }
    };
    return (
        /* This is structure is used to avoid */
        <BaseMainScreen title={title} back={back} onBack={handleBack}>
            <CardBackgroundWrapper>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ContentRoot>{children}</ContentRoot>
                </ScrollView>
            </CardBackgroundWrapper>
        </BaseMainScreen>
    );
};

export default BaseSecondaryScreen;

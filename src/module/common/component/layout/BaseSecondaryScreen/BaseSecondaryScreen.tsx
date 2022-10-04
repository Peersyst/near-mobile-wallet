import BaseMainScreen, { BaseMainScreenProps } from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";
import { ScrollView } from "react-native";
import { ContentRoot } from "./BaseSecondaryScreen.styles";

export type BaseSecondaryScreenProps = Partial<BottomTabScreenNavigatonProps> & Omit<BaseMainScreenProps, "onBack">;

const BaseSecondaryScreen = ({ children, title, back, navigation }: BaseSecondaryScreenProps): JSX.Element => {
    const handleBack = () => {
        if (navigation && navigation.canGoBack()) {
            navigation.goBack();
        }
    };
    return (
        /* This is structure is used to avoid */
        <BaseMainScreen title={title} back={back} onBack={handleBack}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#F6F6F6", padding: 10 }}>
                {children}
            </ScrollView>
        </BaseMainScreen>
    );
};

export default BaseSecondaryScreen;

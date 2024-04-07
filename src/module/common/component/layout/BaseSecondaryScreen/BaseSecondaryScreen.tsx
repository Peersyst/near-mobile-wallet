import BaseMainScreen, { BaseMainScreenProps } from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { SecondaryScreenScrollView } from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen.styles";
import useNavigation from "module/common/hook/useNavigation";
import { ViewStyle } from "react-native";

export type BaseSecondaryScreenProps = Omit<BaseMainScreenProps, "onBack"> & {
    childrenStyle?: ViewStyle;
};

const BaseSecondaryScreen = ({ children, childrenStyle, ...rest }: BaseSecondaryScreenProps): JSX.Element => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (navigation && navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <BaseMainScreen onBack={handleBack} {...rest}>
            <SecondaryScreenScrollView showsVerticalScrollIndicator={false} style={childrenStyle}>
                {children}
            </SecondaryScreenScrollView>
        </BaseMainScreen>
    );
};

export default BaseSecondaryScreen;

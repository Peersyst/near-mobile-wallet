import BaseMainScreen, { BaseMainScreenProps } from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import { SecondaryScreenScrollView } from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen.styles";
import useNavigation from "module/common/hook/useNavigation";

export type BaseSecondaryScreenProps = Omit<BaseMainScreenProps, "onBack">;

const BaseSecondaryScreen = ({ children, ...rest }: BaseSecondaryScreenProps): JSX.Element => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (navigation && navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <BaseMainScreen onBack={handleBack} {...rest}>
            <SecondaryScreenScrollView showsVerticalScrollIndicator={false}>{children}</SecondaryScreenScrollView>
        </BaseMainScreen>
    );
};

export default BaseSecondaryScreen;

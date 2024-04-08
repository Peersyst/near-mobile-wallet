import BaseMainScreen, { BaseMainScreenProps } from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import useNavigation from "module/common/hook/useNavigation";
import { BaseTabsScreenScrollView } from "./BaseTabsScreen.styles";

export type BaseSecondaryScreenProps = Omit<BaseMainScreenProps, "onBack"> & {};

const BaseTabsScreen = ({ children, ...rest }: BaseSecondaryScreenProps): JSX.Element => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (navigation && navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <BaseMainScreen onBack={handleBack} {...rest}>
            <BaseTabsScreenScrollView showsVerticalScrollIndicator={false}>{children}</BaseTabsScreenScrollView>
        </BaseMainScreen>
    );
};

export default BaseTabsScreen;

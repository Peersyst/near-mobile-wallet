import BaseMainScreen, { BaseMainScreenProps } from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import useNavigation from "module/common/hook/useNavigation";
import { BaseTabs, BaseTabsScreenScrollView } from "./BaseTabsScreen.styles";
import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";

export type BaseSecondaryScreenProps = Omit<BaseMainScreenProps, "onBack" | "children"> & {
    tabs: MainTabItemType[];
};

const BaseTabsScreen = ({ tabs, ...rest }: BaseSecondaryScreenProps): JSX.Element => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (navigation && navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <BaseMainScreen onBack={handleBack} {...rest}>
            <BaseTabsScreenScrollView showsVerticalScrollIndicator={false}>
                <BaseTabs tabs={tabs} />
            </BaseTabsScreenScrollView>
        </BaseMainScreen>
    );
};

export default BaseTabsScreen;

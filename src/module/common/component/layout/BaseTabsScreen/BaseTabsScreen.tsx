import BaseMainScreen, { BaseMainScreenProps } from "module/main/component/layout/BaseMainScreen/BaseMainScreen";
import useNavigation from "module/common/hook/useNavigation";
import { BaseTabs, BaseTabsScreenScrollView } from "./BaseTabsScreen.styles";
import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import { useMemo } from "react";

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

    const scrollableTabs = useMemo(
        () =>
            tabs.map(({ title, item }) => ({
                title,
                item: <BaseTabsScreenScrollView showsVerticalScrollIndicator={false}>{item}</BaseTabsScreenScrollView>,
            })),
        [tabs],
    );

    return (
        <BaseMainScreen onBack={handleBack} {...rest}>
            <BaseTabs tabs={scrollableTabs} />
        </BaseMainScreen>
    );
};

export default BaseTabsScreen;

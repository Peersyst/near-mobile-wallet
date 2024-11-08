import { FiatOrderTab } from "stack-navigator";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import BuyScreen from "module/fiatorders/screen/BuyScreen/BuyScreen";
import BuySuccessScreen from "module/fiatorders/screen/BuySuccessScreen/BuySuccessScreen";
import { Platform, View } from "react-native";
import { useBasePagePaddingTop } from "module/common/component/layout/BasePage/hooks/useBasePagePaddingTop";

export enum FiatOrderScreens {
    BUY = "Buy",
    BUY_SUCCESS = "BuySuccess",
}

const FiatOrdersNavigationGroup = () => {
    const watchStatusBar = Platform.OS === "android";
    /**
     * Due to a problem with the MainBottomNavigatorGroup a paddingTop is needed to be passed to the main
     * children of the BasePage. This is a workaround to fix the issue with the padding.
     */
    const paddingTop = useBasePagePaddingTop({ header: false, watchStatusBar });

    return (
        <BasePage header={false} watchStatusBar={watchStatusBar}>
            <View style={{ paddingTop, flex: 1 }}>
                <FiatOrderTab.Navigator initialRouteName={FiatOrderScreens.BUY} screenOptions={{ headerShown: false }}>
                    <FiatOrderTab.Screen name={FiatOrderScreens.BUY} component={BuyScreen} />
                    <FiatOrderTab.Screen name={FiatOrderScreens.BUY_SUCCESS} component={BuySuccessScreen} />
                </FiatOrderTab.Navigator>
            </View>
        </BasePage>
    );
};

export default FiatOrdersNavigationGroup;

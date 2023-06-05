import { FiatOrderTab } from "stack-navigator";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import BuyScreen from "module/fiatorders/screen/BuyScreen/BuyScreen";
import BuySuccessScreen from "module/fiatorders/screen/BuySuccessScreen/BuySuccessScreen";
import { Platform } from "react-native";

export enum FiatOrderScreens {
    BUY = "Buy",
    BUY_SUCCESS = "BuySuccess",
}

const FiatOrdersNavigationGroup = () => (
    <BasePage header={false} watchStatusBar={Platform.OS === "android"}>
        <FiatOrderTab.Navigator initialRouteName={FiatOrderScreens.BUY} screenOptions={{ headerShown: false }}>
            <FiatOrderTab.Screen name={FiatOrderScreens.BUY} component={BuyScreen} />
            <FiatOrderTab.Screen name={FiatOrderScreens.BUY_SUCCESS} component={BuySuccessScreen} />
        </FiatOrderTab.Navigator>
    </BasePage>
);

export default FiatOrdersNavigationGroup;

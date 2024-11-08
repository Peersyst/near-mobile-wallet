import { FiatOrderTab } from "stack-navigator";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import BuyScreen from "module/fiatorders/screen/BuyScreen/BuyScreen";
import BuySuccessScreen from "module/fiatorders/screen/BuySuccessScreen/BuySuccessScreen";
import { Platform } from "react-native";
import { withBasePageContent } from "module/common/component/layout/BasePage/BasePageContent/hoc/withBasePageContent";

export enum FiatOrderScreens {
    BUY = "Buy",
    BUY_SUCCESS = "BuySuccess",
}

const FiatOrdersNavigationGroup = () => (
    <BasePage header={false} watchStatusBar={Platform.OS === "android"}>
        <FiatOrderTab.Navigator initialRouteName={FiatOrderScreens.BUY} screenOptions={{ headerShown: false }}>
            <FiatOrderTab.Screen name={FiatOrderScreens.BUY} component={withBasePageContent(BuyScreen)} />
            <FiatOrderTab.Screen name={FiatOrderScreens.BUY_SUCCESS} component={withBasePageContent(BuySuccessScreen)} />
        </FiatOrderTab.Navigator>
    </BasePage>
);

export default FiatOrdersNavigationGroup;

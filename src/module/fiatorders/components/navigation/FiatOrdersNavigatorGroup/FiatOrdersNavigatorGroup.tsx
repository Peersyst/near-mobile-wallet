import { FiatOrderTab } from "stack-navigator";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import BuyScreen from "module/fiatorders/screen/BuyScreen/BuyScreen";

export enum FiatOrderScreens {
    BUY = "Buy",
}

const FiatOrdersNavigationGroup = () => (
    <BasePage header={false}>
        <FiatOrderTab.Navigator initialRouteName={FiatOrderScreens.BUY} screenOptions={{ headerShown: false }}>
            <FiatOrderTab.Screen name={FiatOrderScreens.BUY} component={BuyScreen} />
        </FiatOrderTab.Navigator>
    </BasePage>
);

export default FiatOrdersNavigationGroup;

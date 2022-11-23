import { RouteProp } from "@react-navigation/native";
import { RootStackParamsList, MainStackParamsList } from "stack-navigator";

type RouteNameType = "Login" | "AuthSwitch" | "CreateWallet" | "ImportWallet" | keyof MainStackParamsList;
type MockedRouterType = RouteProp<RootStackParamsList, RouteNameType>;

export function getMockedRouter(
    name: RouteNameType,
    params?: Readonly<{
        address: string;
    }>,
): MockedRouterType {
    return {
        key: "Receive-sY9fYDeMufbBe6M_Gt2or",
        name: name,
        params: params as any,
        path: undefined,
    };
}

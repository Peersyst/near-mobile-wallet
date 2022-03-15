import { RouteProp } from "@react-navigation/native";
import { RootStackParamsList, MainStackParamsList } from "stack-navigator";

type RouteNameType = "Login" | "AuthSwitch" | "CreateWallet" | "ImportWallet" | keyof MainStackParamsList;
type mockedRouterType = RouteProp<RootStackParamsList, RouteNameType>;

export function getMockedRouter(
    name: RouteNameType,
    params?: Readonly<{
        address: string;
    }>,
): mockedRouterType {
    return {
        key: "Receive-sY9fYDeMufbBe6M_Gt2or",
        name: name,
        params: params,
        path: undefined,
    };
}

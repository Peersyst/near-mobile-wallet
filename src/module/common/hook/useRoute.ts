import { RouteProp, useRoute as useRouteBase } from "@react-navigation/native";
import { RootStackParamsList } from "stack-navigator";

export default function useRoute() {
    return useRouteBase<RouteProp<RootStackParamsList>>();
}

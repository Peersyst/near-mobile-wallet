import { useNavigation as useNavigationBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";

export default function useNavigation() {
    return useNavigationBase<NativeStackNavigationProp<RootStackParamsList>>();
}

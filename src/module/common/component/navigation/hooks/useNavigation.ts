import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";

export default function usNavigation() {
    return useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
}

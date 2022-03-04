import { useNavigation as NativeNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";

export default function useNavigation() {
    return NativeNavigation<NativeStackNavigationProp<RootStackParamsList>>();
}

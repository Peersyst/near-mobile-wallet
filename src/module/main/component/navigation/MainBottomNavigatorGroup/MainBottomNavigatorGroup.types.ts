import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { MainStackParamsList } from "stack-navigator";

export type BottomTabScreenPropsType = BottomTabScreenProps<MainStackParamsList>;

export type BottomTabScreenNavigatonProps = Pick<BottomTabScreenPropsType, "navigation">;

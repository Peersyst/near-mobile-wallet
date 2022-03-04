import { ViewProps } from "react-native";

export interface AdviseCardProps {
    number: number;
    totalAdvises?: number;
    text: string;
    onNext?: () => unknown;
    onBack?: () => unknown;
    style?: ViewProps;
}

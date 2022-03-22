import { ViewProps } from "react-native";

export interface AdviseCardProps {
    number: number;
    totalAdvises?: number;
    title?: string;
    text: string;
    onNext?: () => unknown;
    onBack?: () => unknown;
    style?: ViewProps;
}

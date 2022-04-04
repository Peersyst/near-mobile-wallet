import { ReactElement } from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

interface ControlledSuspenseProps extends Pick<ActivityIndicatorProps, "color" | "size"> {
    isLoading: boolean;
    children: ReactElement;
    fallback?: ReactElement;
}

const ControlledSuspense = ({ isLoading, children, fallback, color, size }: ControlledSuspenseProps) => {
    const loaderComponent = fallback || <ActivityIndicator testID="actIndicator" color={color || "black"} size={size || "large"} />;
    return isLoading ? loaderComponent : children;
};

export default ControlledSuspense;

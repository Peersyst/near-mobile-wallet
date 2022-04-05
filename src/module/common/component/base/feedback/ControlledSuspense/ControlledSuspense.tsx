import { ReactElement } from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

interface ControlledSuspenseProps {
    isLoading: boolean;
    activityIndicatorColor?: ActivityIndicatorProps["color"];
    activityIndicatorSize?: ActivityIndicatorProps["size"];
    children: ReactElement;
    fallback?: ReactElement;
}

const ControlledSuspense = ({ isLoading, children, fallback, activityIndicatorColor, activityIndicatorSize }: ControlledSuspenseProps) => {
    const loaderComponent = fallback || (
        <ActivityIndicator testID="actIndicator" color={activityIndicatorColor || "black"} size={activityIndicatorSize || "large"} />
    );
    return isLoading ? loaderComponent : children;
};

export default ControlledSuspense;

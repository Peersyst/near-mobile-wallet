import { ReactElement } from "react";
import { ActivityIndicator } from "react-native";

interface ControlledSuspenseProps {
    isLoading: boolean;
    children: ReactElement;
    fallback?: ReactElement;
}

const ControlledSuspense = ({ isLoading, children, fallback }: ControlledSuspenseProps) => {
    const loaderComponent = fallback || <ActivityIndicator color="black" size="large" />;
    return isLoading ? loaderComponent : children;
};

export default ControlledSuspense;
